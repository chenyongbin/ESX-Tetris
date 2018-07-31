/**
 * @file 告知模块
 * @module notice
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

import { getNoticeContainer } from './var/containers';
let $container = null;

/**
 * 初始化
 */
const initialize = () => {
    $container = getNoticeContainer && getNoticeContainer();
    // 初始化告知HTML，并将其附加至container
}

/**
 * 在通知区域更新、显示总分、上次得分、下个方块
 * @param {number} totalScore - 总得分
 * @param {number} lastScore - 上次得分
 * @param {object[]} nextBlock - 下个方块的初始坐标集合
 */
const render = (totalScore, lastScore, nextBlock) => { };

initialize();

export default {
    render,
}