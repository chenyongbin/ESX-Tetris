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
 * 更新总得分、上次得分
 * @param {object} score - 需要更新&显示的内容
 * @param {number} score.totalScore - 总得分
 * @param {number} score.lastScore - 上次得分
 */
const renderScore = ({ totalScore, lastScore }) => { };

/**
 * 更新下个方块形状
 * @param {object[]} nextBlock - 下个方块的初始坐标集合
 */
const renderNextBlock = nextBlock => { }

initialize();

export default {
    renderScore,
    renderNextBlock
}