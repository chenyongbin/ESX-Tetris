/**
 * @file 功能模块
 * @module util
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

const gridContainer = $("#grid"),       // 网格容器对象
    gamepadContainer = $("#gamepad"),   // 游戏手柄容器对象
    noticeContainer = $("#notice"),     // 通知栏容器对象
    settingContainer = $("#sidebar");   // 设置容器对象

/**
 * 获取网格的行数
 * @returns {number} 行数
 */
const getGridRowCount = () => {
    if (window.localStorage) {
        let rowCount = localStorage.getItem("ESX-Tetris-GridRowCount");
        if (rowCount) return rowCount;
    }
    return 10;
}

/**
 * 设置网格的行数
 * @param {integer} rowCount - 行数
 */
const setGridRowCount = rowCount => {
    if (window.localStorage) {
        let parsedRowCount = Number(rowCount);
        Number.isInteger(parsedRowCount) && localStorage.setItem("ESX-Tetris-GridRowCount", rowCount);
    }
}

/**
 * 获取网格的列数
 * @returns {number} 列数
 */
const getGridColCount = () => {
    if (window.localStorage) {
        let count = localStorage.getItem("ESX-Tetris-GridColCount");
        if (count) return count;
    }
    return 10;
}

/**
 * 设置网格的列数
 * @param {integer} colCount - 列数
 */
const setGridColCount = colCount => {
    if (window.localStorage) {
        let parsedColCount = Number(colCount);
        Number.isInteger(parsedColCount) && localStorage.setItem("ESX-Tetris-GridColCount", rowCount);
    }
}

/**
 * 检查是否是数组类型
 * @param {*} args - 待检查的参数
 */
const checkIsArray = args => {
    return typeof args === 'object' && args instanceof Array;
}

export {
    gridContainer,
    gamepadContainer,
    noticeContainer,
    settingContainer,

    getGridRowCount,
    setGridRowCount,
    getGridColCount,
    setGridColCount,

    checkIsArray,
}