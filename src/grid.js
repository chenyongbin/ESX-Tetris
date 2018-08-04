/**
 * @file 网格模块
 * @module grid
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

/*
 (0,0)********(1,0)
 *                * 
 *     GRID       *
 *     (x,y)      * 
 *                *
 (0,1)********(1,1)
 */

import { getGridRowCount, getGridColCount } from './config';
import { getGridContainer } from './containers';
import { checkIsArray } from './util';

let $container = getGridContainer(),
    rowCount = getGridRowCount(),
    colCount = getGridColCount(),
    activeClass = 'active',
    highlightClass = 'highlight',
    clearFilledRowsAnimationDuration = 300;

/**
 * 初始化
 */
const initialize = () => {
    let gridHtml = [];
    for (let y = 0; y < rowCount; y++) {
        gridHtml.push(`<div class="row" data-row="y-${y}"`);
        for (let x = 0; x < colCount; x++) {
            gridHtml.push(`<span class="cell" data-point="p-${x}-${y}"></span>`);
        }
        gridHtml.push('</div>');
    }
    $container.html(gridHtml.join(""));
}

/**
 * 激活一个坐标集
 * @param {object[]} coordiantes - 坐标点集合
 */
const activate = coordiantes => {
    if (checkIsArray(coordiantes)) {
        for (let coordinate of coordiantes) {
            $container.find(`[data-point='p-${coordinate.x}-${coordinate.y}']`).addClass(activeClass);
        }
    }
}

/**
 * 取消激活一个坐标集合/某些行
 * @param {object[]|number[]} coordiantes - 坐标点集合/纵坐标集合
 */
const inactivate = coordiantes => {
    if (!checkIsArray(coordiantes)) return false;
    if (coordiantes.length == 0) return false

    if (typeof coordiantes[0] === 'number') {
        for (let y of coordiantes) {
            $container.find(`[data-row='y-${y}']`).addClass(highlightClass);
        }
        setTimeout(() => {
            for (let y of coordiantes) {
                $container.find(`[data-row='y-${y}']`).removeClass(highlightClass);
                $container.find(`[data-row='y-${y}'] .cell`).removeClass(activeClass);
            }
        }, clearFilledRowsAnimationDuration);
    } else if (typeof coordiantes[0] === 'object') {
        for (let coordinate of coordiantes) {
            $container.find(`[data-point='p-${coordinate.x}-${coordinate.y}']`).removeClass(activeClass);
        }
    }
}

/**
 * 获取网格的尺寸
 * @returns {number[]} 网格的尺寸[行数，列数]
 */
const getSize = () => {
    return [rowCount, colCount];
}

/**
 * 清空所有已激活状态的坐标
 */
const inactivateAll = () => {
    $container.find(".cell").removeClass(activeClass).removeClass(highlightClass);
}

initialize();

export default {
    activate,
    inactivate,
    inactivateAll,
    getSize,
}