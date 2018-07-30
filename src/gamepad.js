/**
 * @file 游戏手柄模块
 * @module gamepad
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

import { getGamepadContainer } from './var/containers';
let $container = null;

const initialize = () => {
    $container = getGamepadContainer && getGamepadContainer();
    // 初始化手柄html，并将其绑定至container
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
module.addMoveHandlers = ({
    pauseHandler: pause,
    startoverHandler: startover,
    moveRotateHandler: moveRotate,
    moveLeftHandler: moveLeft,
    moveRightHandler: moveRight,
    moveDownHandler: moveDown,
    moveFallHandler: moveFall
}) => {
    // 注册按钮事件
    $container.on("click", "[data-cmd]", e => {
        e.stopPropagation();
        switch ($(e.currentTarget).data('cmd')) {
            case 'pause': pause && pause(); break;
            case 'startover': startover && startover(); break;
            case 'rotate': moveRotate && moveRotate(); break;
            case 'left': moveLeft && moveLeft(); break;
            case 'right': moveRight && moveRight(); break;
            case 'down': moveDown && moveDown(); break;
            case 'fall': moveFall && moveFall(); break;
        }
    });

    // 注册键盘事件
    $(document).on("keydown", function (e) {
        switch (e.keyCode) {
            case 32: moveFall && moveFall(); break;
            case 37: moveLeft && moveLeft(); break;
            case 38: moveRotate && moveRotate(); break;
            case 39: moveRight && moveRight(); break;
            case 40: moveDown && moveDown(); break;
        }
    });
}

initialize();