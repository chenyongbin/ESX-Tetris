/**
 * @file 引擎模块，启动、暂停、继续、终止游戏
 * @module engine
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

import builder from './builder';
import TetrisTimer from './timer';
import TetrisDatabase from './db';

let activate = null, inactivate = null, gridRowCount = 0, gridColCount = 0,
    renderScore = null, totalScore = 0, lastScore = 0,
    db = null, curBlock = null, nextBlock = null,
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
 * @param {function} startOptions.renderScoreHandler - 方块落下后更新得分的处理方法
 */
const initialize = ({ gridSize, activateHandler, inactivateHandler, renderScoreHandler, }) => {
    // 赋值变量
    [gridRowCount, gridColCount] = gridSize;
    [activate, inactivate, renderScore] = [activateHandler, inactivateHandler, renderScoreHandler];
    // 初始化数据库对象
    db = new TetrisDatabase(gridColCount, gridRowCount);
    // 初始化定时器
    timer = new TetrisTimer(timerInterval, _onTimerElapsed);

    isInitialized = true;
}

const _onTimerElapsed = () => {
    if (curBlock == null) {
        curBlock = nextBlock == null ? builder.getBlock() : nextBlock;
        nextBlock = builder.getBlock();
    }

    // 方块向下移动一次
    moveDown();
    // 更新网格状态
    activate(curBlock.coordinates);

    // 更新数据库
    let { isReacheBottom, filledRows } = db.updateBlock(curBlock);
    // 如果当前方块已到达底部，则进行下一次
    if (isReacheBottom) {
        // 如果有已填满的行，则消除这些行，并更新整个网格的状态
        if (filledRows.length > 0) {
            activate(db.all());
        }
    }
}

/**
 * 启动游戏
 */
const start = () => { }

/**
 * 暂停/继续游戏
 */
const pause = () => { }

/**
 * 重新开始游戏
 */
const startover = () => { }

/**
 * 动作.旋转
 */
const moveRotate = () => { }

/**
 * 动作.向左
 */
const moveLeft = () => { }

/**
 * 动作.向右
 */
const moveRight = () => { }

/**
 * 动作.向下
 */
const moveDown = () => { }

/**
 * 动作.掉落
 */
const moveFall = () => { }

/**
 * 执行前先检查引擎是否已成功初始化，若没有，则抛出异常
 * @param {function} fn - 执行前需要检查的函数
 */
const _checkInitialization = fn => {
    return function () {
        if (!isInitialized)
            throw new Error("The engine has not be initialized.");
        fn && fn();
    }
}

export default {
    initialize,
    start: _checkInitialization(start),
    pause: _checkInitialization(pause),
    startover: _checkInitialization(startover),
    moveRotate: _checkInitialization(moveRotate),
    moveLeft: _checkInitialization(moveLeft),
    moveRight: _checkInitialization(moveRight),
    moveDown: _checkInitialization(moveDown),
    moveFall: _checkInitialization(moveFall),
}