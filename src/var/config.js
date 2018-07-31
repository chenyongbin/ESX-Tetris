/**
 * @file 配置模块
 * @module config
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

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

export default {
    getGridRowCount,
    getGridColCount,
}