/**
 * @file 功能模块
 * @module util
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

/**
 * 检查是否是数组类型
 * @param {*} args - 待检查的参数
 */
const checkIsArray = args => {
    return typeof args === 'object' && args instanceof Array;
}

export {
    checkIsArray
}