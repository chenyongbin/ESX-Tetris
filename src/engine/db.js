/**
 * @file 数据库模块
 * @module dataBase
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

class TetrisDatabase {
    /**
     * 初始化
     * @param {number} x - 横坐标最大值
     * @param {number} y - 纵坐标最大值
     */
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    /**
     * 更新方块坐标
     * @param {object[]} lastCoordinates - 方块上个坐标数组
     * @param {object[]} coordinates - 方块新的坐标数组
     * @returns {number[]} 已填满的行的行号数组
     */
    update(lastCoordinates, coordinates) {
        return { isFailed: false, isReachedBoundary: false, filledRows: [] };
    }

    /**
     * 返回所有方块数据
     * @returns {object[]}
     */
    all() { }

    /**
     * 清空现有数据
     */
    clear() { }
}

export default TetrisDatabase;