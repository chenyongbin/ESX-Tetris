/**
 * @file 告知模块
 * @module notice
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

import { getNoticeContainer } from './containers';
let $container = getNoticeContainer();

/**
 * 初始化
 */
const initialize = () => {
    // 初始化告知HTML，并将其附加至container
}

/**
 * 在通知区域更新、显示总分、上次得分、下个方块
 * @param {object} renderContent - 需要更新&显示的内容
 * @param {number} renderContent.totalScore - 总得分
 * @param {number} renderContent.lastScore - 上次得分
 * @param {object[]} renderContent.nextBlock - 下个方块的初始坐标集合
 */
const render = ({ totalScore, lastScore, nextBlock, }) => { };

initialize();

export default {
    render,
}