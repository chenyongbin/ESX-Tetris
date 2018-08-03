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
        this.x = x;
        this.y = y;
    }

    /**
     * 添加一个方块
     * @param {object[]} coordinates - 方块坐标数组
     * @returns {number[]} 已填满的行的行号数组
     */
    add(coordinates) { }

    /**
     * 更新一个方块
     * @param {object[]} coordinates - 方块坐标数组
     * @returns {number[]} 已填满的行的行号数组
     */
    update(coordinates) { }

    /**
     * 返回所有方块数据
     * @returns {object[]}
     */
    all() { }
}

export default TetrisDatabase;