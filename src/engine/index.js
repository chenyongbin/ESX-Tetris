/**
 * @file 引擎模块
 * @version 1.0.0
 */

import { extend, getScore } from '../util';
import DB from './db';
import TIMER from './timer';
import BUILDER from './builder';
import ANIMATION from './animation';

const INTERVAL = 500,
	SHAPES = [],
	SCREEN = {
		matrixSizeX: 0,
		matrixSizeY: 0,
		activate: function() {},
		inactivate: function() {},
		highlight: function() {},
		unhighlight: function() {},
		updateScore: function() {},
		updateEliminatedRowNum: function() {},
		updateNextShape: function() {}
	};

let elapsingObject = {
	shape: null,
	totalScore: 0,
	eliminatedRowNum: 0,
	isHighlightAnimating: false,
	clear() {
		elapsingObject.shape = null;
		elapsingObject.totalScore = 0;
		elapsingObject.eliminatedRowNum = 0;
		elapsingObject.isHighlightAnimating = false;
	}
};

/**
 * 初始化
 * @param {object} screenOptions 屏幕配置选项
 */
const initialize = (screenOptions) => {
	extend(SCREEN, screenOptions);

	DB.initialize(SCREEN.matrixSizeX, SCREEN.matrixSizeY);
	TIMER.initialize(INTERVAL, onTimerElapsed);
	ANIMATION.initialize(screenOptions);
};

/**
 * 当定时器经过一个单位的间隔时间后的处理程序
 * @returns
 */
const onTimerElapsed = () => {
	if (elapsingObject.isHighlightAnimating) return;

	while (SHAPES.length < 2) {
		SHAPES.push(BUILDER.getShape(SCREEN.matrixSizeX));
	}

	if (!elapsingObject.shape) {
		elapsingObject.shape = SHAPES.shift();
		SCREEN.updateNextShape(SHAPES[0].getRawCoordinates());
	}

	elapsingObject.shape.down();

	return onShapeMoved();
};

/**
 * 当图形发生移动时的处理程序
 * @returns
 */
const onShapeMoved = () => {
	if (!elapsingObject.shape) return;

	DB.update(elapsingObject.shape.prevCoordinates, elapsingObject.shape.coordinates);
	SCREEN.inactivate(elapsingObject.shape.prevCoordinates);
	SCREEN.activate(elapsingObject.shape.coordinates);

	if (DB.checkWhetherHasReachedBottom(elapsingObject.shape.coordinates)) {
		onRowsFilled(DB.getFilledYCoordinates());
		elapsingObject.shape = null;
	}
};

/**
 * 当有若干行被填满时的处理程序
 * @param {Array<integer>} yCoordinates 行的Y轴坐标集合
 * @returns
 */
const onRowsFilled = (yCoordinates) => {
	if (!yCoordinates || yCoordinates.length == 0) {
		if (DB.isAllFilled()) {
			console.log(
				`You lost game at ${new Date().toLocaleString()}, and you got ${elapsingObject.totalScore} in score while you had eliminated ${elapsingObject.eliminatedRowNum} rows.`
			);
			stop();

      // 开启清屏动画，然后再次启动引擎
			ANIMATION.fillScreen(() => {
				ANIMATION.clearScreen(start);
			});
		}
		return;
	}

	elapsingObject.isHighlightAnimating = true;
	ANIMATION.highlight(yCoordinates, 5, () => {
		elapsingObject.totalScore += getScore(yCoordinates);
		SCREEN.updateScore(elapsingObject.totalScore);
		elapsingObject.eliminatedRowNum += yCoordinates.length;
		SCREEN.updateEliminatedRowNum(elapsingObject.eliminatedRowNum);

		DB.reset(yCoordinates, (inactives, actives) => {
			SCREEN.inactivate(inactives);
			SCREEN.activate(actives);
		});
		elapsingObject.isHighlightAnimating = false;

		onRowsFilled(DB.getFilledYCoordinates());
	});
};

/**
 * 启动引擎
 */
const start = () => {
	TIMER.start();
};

/**
 * 停止引擎
 *
 */
const stop = () => {
	TIMER.stop();
	elapsingObject.clear();
};

/**
 * 当收到左移指令时
 * @returns
 */
const onMoveLeft = () => {
	if (elapsingObject.shape && DB.checkWhetherHasReachedLeft(elapsingObject.shape.coordinates)) return;
	if (elapsingObject.shape) {
		elapsingObject.shape.left();
		return onShapeMoved();
	}
};

/**
 * 当收到右移指令时
 * @returns
 */
const onMoveRight = () => {
	if (elapsingObject.shape && DB.checkWhetherHasReachedRight(elapsingObject.shape.coordinates)) return;
	if (elapsingObject.shape) {
		elapsingObject.shape.right();
		return onShapeMoved();
	}
};

/**
 * 当收到下移指令时
 * @returns
 */
const onMoveDown = () => {
	if (elapsingObject.shape && DB.checkWhetherHasReachedBottom(elapsingObject.shape.coordinates)) return;
	if (elapsingObject.shape) {
		elapsingObject.shape.down();
		return onShapeMoved();
	}
};

/**
 * 当收到掉落指令时
 * @returns
 */
const onMoveDrop = () => {
	while (elapsingObject.shape) {
		elapsingObject.shape.down();
		onShapeMoved();
	}
};

/**
 * 当收到旋转指令时
 * @returns
 */
const onMoveRotate = () => {
	if (elapsingObject.shape && DB.checkWhetherHasReachedBottom(elapsingObject.shape.coordinates)) return;
	if (elapsingObject.shape) {
		elapsingObject.shape.rotate();
		return onShapeMoved();
	}
};

/**
 * 当收到暂停指令时
 * @returns
 */
const onGamePause = () => {
	TIMER.pause();
};

/**
 * 当收到重启指令时
 * @returns
 */
const onGameRestart = () => {
	TIMER.resume();
};

export default {
	initialize,
	start,
	onMoveLeft,
	onMoveRight,
	onMoveDown,
	onMoveDrop,
	onMoveRotate,
	onGamePause,
	onGameRestart
};
