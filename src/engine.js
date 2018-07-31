/**
 * @file 引擎模块，启动、暂停、继续、终止游戏
 * @module engine
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

let activate = null, inactivate = null, renderScore = null,
    gridRowCount = 0, gridColCount = 0;

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
    [gridRowCount, gridColCount] = gridSize;
    [activate, inactivate, renderScore] = [activateHandler, inactivateHandler, renderScoreHandler];
    // 初始化模块变量，注册激活、取消激活等处理方法
}

/**
 * 启动游戏
 */
const start = () => {
    // 初始化模块变量，随机新建一个方块
    // 创建并启动一个循环定时器，每个定时间隔，改变一次方块的位移，并刷新网格控件的展示
}

/**
 * 暂停/继续游戏
 */
const pause = () => {
}

/**
 * 重新开始游戏
 */
const startover = () => {
}

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

export default {
    initialize,
    start,
    pause,
    startover,
    moveRotate,
    moveLeft,
    moveRight,
    moveDown,
    moveFall,
}