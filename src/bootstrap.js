/**
 * @file 启动模块
 * @module grid
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */
import './css/style.css';
import grid from './grid';
import engine from './engine';
import gamepad from './gamepad';
import notice from './notice';

$(function () {
    gamepad.bindMoveHandlers({
        pauseHandler: engine.pause,
        startoverhandler: engine.start,
        moveRotateHandler: engine.moveRotate,
        moveLeftHandler: engine.moveLeft,
        moveRightHandler: engine.moveRight,
        moveDownHandler: engine.moveDown,
        moveFallHandler: engine.moveFall
    });

    engine.initialize({
        gridSize: grid.getSize(),
        activateHandler: grid.activate,
        inactivateHandler: grid.inactivate,
        highlightHandler: grid.highlight,
        unhighlightHandler: grid.unhighlight,
        inactivateAllHandler: grid.inactivateAll,
        renderScoreHandler: notice.renderScore,
        renderNextBlockHandler: notice.renderNextBlock
    });
    // engine.start();
});