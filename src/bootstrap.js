/**
 * @file 启动模块
 * @module grid
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

import * as grid from './grid';
import * as engine from './engine';
import * as gamepad from './gamepad';
import * as notice from './notice';

gamepad.addMoveHandlers({
    pauseHandler: engine.pause,
    startoverhandler: engine.startover,
    moveRotateHandler: engine.moveRotateHandler,
    moveLeftHandler: engine.moveLeftHandler,
    moveRightHandler: engine.moveRightHandler,
    moveDownHandler: engine.moveDownHandler,
    moveFallHandler: engine.moveFallHandler
});

engine.initialize({
    gridSize: grid.getSize(),
    activateHandler: grid.activate,
    inactivateHandler: grid.iniactivate,
    renderScoreHandler: notice.render
});
engine.start();