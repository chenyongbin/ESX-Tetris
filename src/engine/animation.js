import { extend } from '../util';
import DB from './db';

const SCREEN = {
	matrixSizeY: 0,
	activate: function() {},
	inactivate: function() {},
	highlight: function() {},
	unhighlight: function() {}
};

/**
 * 初始化
 * @param {object} screenOptions 屏幕配置选项
 */
const initialize = (screenOptions) => {
	extend(SCREEN, screenOptions);
};

/**
 * 高亮
 * @param {Array<integer>} yCoordinates Y轴坐标集合
 * @param {integer} count 计数
 * @param {function} callback 回调
 * @param {integer} timer 定时器ID
 */
const highlight = (yCoordinates, count, callback, timer) => {
	if (count % 2 == 0) {
		SCREEN.unhighlight(yCoordinates);
	} else {
		SCREEN.highlight(yCoordinates);
	}

	count--;
	timer && clearTimeout(timer);
	if (count >= 0) {
		timer = setTimeout(() => {
			return highlight(yCoordinates, count, callback, timer);
		}, 150);
	} else {
		callback && callback();
	}
};

/**
 * 填满屏幕
 * @param {function} callback 回调
 * @param {integer} timer 定时器ID
 * @param {integer} y Y轴坐标
 * @returns
 */
const fillScreen = (callback, timer, y) => {
	if (y === undefined) y = SCREEN.matrixSizeY - 1;
	timer && clearTimeout(timer);

	let coordinates = DB.fillRow(y);
	if (coordinates && coordinates.length > 0) {
		SCREEN.activate(coordinates);
	} else {
		callback && callback();
		return;
	}

	y--;
	timer = setTimeout(() => {
		return fillScreen(callback, timer, y);
	}, 70);
};

/**
 * 清理屏幕
 * @param {function} callback 回调
 * @param {integer} timer 定时器ID
 * @param {integer} y Y轴坐标
 * @returns
 */
const clearScreen = (callback, timer, y) => {
	if (y === undefined) y = 0;
	timer && clearTimeout(timer);

	let coordinates = DB.clearRow(y);
	if (coordinates && coordinates.length > 0) {
		SCREEN.inactivate(coordinates);
	} else {
		callback && callback();
		return;
	}

	y++;
	timer = setTimeout(() => {
		return clearScreen(callback, timer, y);
	}, 70);
};

export default {
	initialize,
	highlight,
	fillScreen,
	clearScreen
};
