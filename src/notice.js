/**
 * @file 告知模块
 * @module notice
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

import {
    noticeContainer as $container,
    checkIsArray
} from './util';

/**
 * 初始化
 */
const initialize = () => {
    let gridHtml = [];
    for (let y = 0; y < 6; y++) {
        gridHtml.push(`<div class="row" data-row="y-${y}"`);
        for (let x = 0; x < 6; x++) {
            gridHtml.push(`<span class="cell" data-point="p-${x}-${y}"></span>`);
        }
        gridHtml.push('</div>');
    }

    $container.html(`
        <div class="score" data-type="totalScore">
            <div class="label">总得分</div>
            <div class="value"></div>
        </div>
        <div class="score" data-type="lastScore">
            <div class="label">上次得分</div>
            <div class="value"></div>
        </div>
        <div class="grid">${gridHtml.join("")}</div>
    `);
}

/**
 * 更新总得分、上次得分
 * @param {object} score - 需要更新&显示的内容
 * @param {number} score.totalScore - 总得分
 * @param {number} score.lastScore - 上次得分
 */
const renderScore = ({ totalScore, lastScore }) => {
    $container.find("[data-type='totalScore'] .value").html(totalScore);
    $container.find("[data-type='lastScore'] .value").html(lastScore);
};

/**
 * 更新下个方块形状
 * @param {object[]} coordinates - 下个方块的初始坐标集合
 */
const renderNextBlock = coordinates => {
    if (checkIsArray(coordinates)) {
        for (let coordinate of coordinates) {
            $container.find(`[data-point='p-${coordinate.x + 1}-${coordinate.y + 1}']`).addClass("active");
        }
    }
}

initialize();

export default {
    renderScore,
    renderNextBlock
}