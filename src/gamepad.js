/**
 * @file 游戏手柄模块
 * @module gamepad
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

import { getGamepadContainer } from './containers';
let $container = getGamepadContainer();

/**
 * 初始化
 */
const initialize = () => {
    $container.html(`
        <div class="left">
            <div data-cmd="left">LEFT</div>
            <div data-cmd="right">RIGHT</div>
            <div data-cmd="rotate">ROTATE</div>
            <div data-cmd="down">DOWN</div>
            <div data-cmd="fall">FALL</div>
        </div>
        <div class="right">
            <div data-cmd="pause">暂停</div>
            <div data-cmd="startover">重新开始</div>
        </div>
    `);
}

/**
 * 为游戏手柄添加各个操作按钮对应的处理方法
 * @param {object} handlerObject - 游戏手柄操作按钮对应的处理方法对象结合
 * @param {function} handlerObject.pauseHandler - 暂停处理方法
 * @param {function} handlerObject.startoverHandler - 重新开始处理方法
 * @param {function} handlerObject.moveRotateHandler - 旋转处理方法
 * @param {function} handlerObject.moveLeftHandler - 向左处理方法
 * @param {function} handlerObject.moveRightHandler - 向右处理方法
 * @param {function} handlerObject.moveDownHandler - 向下处理方法
 * @param {function} handlerObject.moveFallHandler - 掉落处理方法
 */
const bindMoveHandlers = ({
    pauseHandler,
    startoverHandler,
    moveRotateHandler,
    moveLeftHandler,
    moveRightHandler,
    moveDownHandler,
    moveFallHandler,
}) => {
    // 注册按钮事件
    $container.on("click", "[data-cmd]", e => {
        e.stopPropagation();
        switch ($(e.currentTarget).attr('data-cmd')) {
            case 'pause': pauseHandler && pauseHandler(); break;
            case 'startover': startoverHandler && startoverHandler(); break;
            case 'rotate': moveRotateHandler && moveRotateHandler(); break;
            case 'left': moveLeftHandler && moveLeftHandler(); break;
            case 'right': moveRightHandler && moveRightHandler(); break;
            case 'down': moveDownHandler && moveDownHandler(); break;
            case 'fall': moveFallHandler && moveFallHandler(); break;
        }
    });

    // 注册键盘事件
    $(document).on("keydown", function (e) {
        switch (e.keyCode) {
            case 32: moveFallHandler && moveFallHandler(); break;
            case 37: moveLeftHandler && moveLeftHandler(); break;
            case 38: moveRotateHandler && moveRotateHandler(); break;
            case 39: moveRightHandler && moveRightHandler(); break;
            case 40: moveDownHandler && moveDownHandler(); break;
        }
    });
}

initialize();

export default {
    bindMoveHandlers,
}