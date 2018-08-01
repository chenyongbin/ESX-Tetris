/**
 * @file 容器模块，提供页面各个模块的容器DOM元素
 * @module containers
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

/**
 * 获取网格容器DOM
 * @returns {jQueryObject}
 */
const getGridContainer = () => {
    return $("#grid");
}

/**
  * 获取游戏手柄容器DOM
  * @returns {jQueryObject}
  */
const getGamepadContainer = () => {
    return $("#gamepad");
}

/**
  * 获取通知栏容器DOM
  * @returns {jQueryObject}
  */
const getNoticeContainer = () => {
    return $("#notice");
}

/**
  * 获取边框设置容器DOM
  * @returns {jQueryObject}
  */
const getSidebarContainer = () => {
    return $("#sidebar");
}

export {
    getGridContainer,
    getGamepadContainer,
    getNoticeContainer,
    getSidebarContainer,
}