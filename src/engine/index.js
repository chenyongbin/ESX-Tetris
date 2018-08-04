/**
 * @file 引擎模块，启动、暂停、继续、终止游戏
 * @module engine
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

import builder from './builder';
import TetrisTimer from './timer';
import TetrisDatabase from './db';

let activateGrid = null, inactivateGrid = null, clearGrid = null,
    totalScore = 0, lastScore = 0, renderScore = null,
    curBlock = null, nextBlock = null, renderNextBlock,
    db = null, gridRowCount = 0, gridColCount = 0,
    timer = null, timerInterval = 1000,
    isInitialized = false;

/**
 * 根据提供的配置项，初始化引擎
 * @param {object} startOptions - 引擎启动所需配置项
 * @param {number[]} startOptions.gridSize - 网格尺寸
 * @param {number} startOptions.gridSize.rowCount - 行的数目
 * @param {number} startOptions.gridSize.colCount - 列的数目
 * @param {function} startOptions.activateHandler - 激活操作的处理方法
 * @param {function} startOptions.inactivateHandler - 取消激活操作的处理方法
 * @param {function} startOptions.inactivateAllHandler - 取消激活所有操作的处理方法
 * @param {function} startOptions.renderScoreHandler - 更新得分的处理方法
 * @param {function} startOptions.renderNextBlockHandler - 更新下个方块的处理方法
 */
const initialize = ({ gridSize, activateHandler, inactivateHandler, inactivateAllHandler, renderScoreHandler, renderNextBlockHandler }) => {
    // 赋值变量
    [gridRowCount, gridColCount] = gridSize;
    [activateGrid, inactivateGrid, clearGrid] = [activateHandler, inactivateHandler, inactivateAllHandler];
    [renderScore, renderNextBlock] = [renderScoreHandler, renderNextBlockHandler];
    // 初始化数据库对象
    db = new TetrisDatabase(gridColCount, gridRowCount);
    // 初始化定时器
    timer = new TetrisTimer(timerInterval, onTimerElapsed);

    isInitialized = true;
}

/**
 * 除了initialize外，其它方法执行前先检查引擎是否已成功初始化，若没有，则抛出异常 
 */
const checkInitialization = () => {
    if (!isInitialized)
        throw new Error("The engine has not be initialized.");
}

/**
 * 定时器一个时间间隔内的执行方法
 */
const onTimerElapsed = () => {
    if (curBlock == null) {
        curBlock = nextBlock == null ? builder.getBlock() : nextBlock;
        nextBlock = builder.getBlock();
        renderNextBlock(nextBlock.coordinates);
    }    

    // 方块向下移动一次
    curBlock.down();
    // 手动执行当前方块移动后的处理方法
    onCurrentBlockMoved();
}

/**
 * 当前方块移动一下之后的执行方法
 */
const onCurrentBlockMoved = () => {
    // 更新网格状态
    inactivateGrid(curBlock.lastCoordinates);
    activateGrid(curBlock.coordinates);

    // 更新数据库
    let { isFailed = false, isReachedBoundary = false, filledRows = [] } = db.update(curBlock.lastCoordinates, curBlock.coordinates);
    if (isFailed) {
        // 如果当前游戏失败了的话，停止定时器
        timer.stop();
        // 销毁当前方块资源
        curBlock = null;
    } else {
        // 如果当前方块已触及(向左/向右/向下)边界，则将当前方块对象置为空
        isReachedBoundary && (curBlock = null);
        // 如果有已填满的行
        if (filledRows.length > 0) {
            // 消除这些行，并更新整个网格的状态
            inactivateGrid(filledRows);
            activateGrid(db.all());
            // 计算得分，并推送给通知栏更新得分
            lastScore = calculateScore(filledRows);
            totalScore += lastScore;
            renderScore({ totalScore: totalScore, lastScore: lastScore });
        }
    }

    return { isFailed: isFailed, isReachedBoundary: isReachedBoundary };
}

/**
 * 计算得分
 * @param {number[]} filledRows - 已填充的行号数组
 * @param [number 本次得分
 */
const calculateScore = filledRows => {
    // 行不连续时，每填满一行得10分
    // 两行连续的，得20分
    // 三行连续的，得50分
    // 四行连续的，得100分
}

/**
 * 开始游戏
 */
const start = () => {
    db.clear();
    clearGrid();
    renderScore({ totalScore: 0, lastScore: 0 });
    renderNextBlock([]);
    curBlock = null;
    nextBlock = null;
    timer.start();
}

/**
 * 暂停/继续游戏
 */
const pause = () => {
    timer.isPaused() ? timer.resume() : timer.pause();
}

/**
 * 动作.旋转
 */
const moveRotate = () => {
    if (curBlock) {
        timer.isPaused() && timer.resume();
        curBlock.rotate();
    }
}

/**
 * 动作.向左
 */
const moveLeft = () => {
    if (curBlock) {
        timer.isPaused() && timer.resume();
        curBlock.left();
    }
}

/**
 * 动作.向右
 */
const moveRight = () => {
    if (curBlock) {
        timer.isPaused() && timer.resume();
        curBlock.right();
    }
}

/**
 * 动作.向下
 */
const moveDown = () => {
    if (curBlock) {
        timer.isPaused() && timer.resume();
        curBlock.down();
    }
}

/**
 * 动作.掉落
 */
const moveFall = () => {
    if (curBlock) {
        timer.pause();
        let result = { isFailed: false, isReachedBoundary: false };
        while (!result.isFailed && !result.isReachedBoundary) {
            curBlock.down();
            result = onCurrentBlockMoved();
        }
        timer.resume();
    }
}

/**
 * 包装向外暴露的接口
 * @param {object} options - 包装接口的参数
 * @param {function[]} options.pres - 前置执行方法，这些方法可能会抛出异常
 * @param {function} options.fn - 向外暴露的功能方法
 * @param {function[]} options.posts - 后置执行方法，执行完功能方法后执行这些方法
 */
const wrapInterface = ({ pres = [checkInitialization], fn, posts }) => {
    return function () {
        if (pres && pres.length) {
            for (let pre of pres) {
                pre();
            }
        }

        fn && fn();

        if (posts && posts.length) {
            for (let post of posts) {
                post && post();
            }
        }
    }
}

export default {
    initialize,
    start: wrapInterface({ fn: start }),
    pause: wrapInterface({ fn: pause }),
    moveRotate: wrapInterface({ fn: moveRotate, posts: [onCurrentBlockMoved] }),
    moveLeft: wrapInterface({ fn: moveLeft, posts: [onCurrentBlockMoved] }),
    moveRight: wrapInterface({ fn: moveRight, posts: [onCurrentBlockMoved] }),
    moveDown: wrapInterface({ fn: moveDown, posts: [onCurrentBlockMoved] }),
    moveFall: wrapInterface({ fn: moveFall }),
}