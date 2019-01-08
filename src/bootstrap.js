/**
 * @file 启动模块
 * @version 1.0.0
 */

let containerDOM = document.getElementById("container");
if (!containerDOM) {
  throw new Error("Cannot find container.");
}

import GamePanel from "./gamepanel";
import Screen from "./screen";
import Control from "./control";
import Engine from "./engine";

GamePanel.initialize(containerDOM);
Screen.initialize(containerDOM, GamePanel.getScreenOptions());
Control.initialize(containerDOM, GamePanel.getControlOptions());
let screenMatrixSize = Screen.getSize();
Engine.initialize({
  matrixSizeX: screenMatrixSize.matrixSizeX,
  matrixSizeY: screenMatrixSize.matrixSizeY,
  activate: Screen.activate,
  inactivate: Screen.inactivate,
  highlight: Screen.highlight,
  unhighlight: Screen.unhighlight,
  updateScore: Screen.updateScore,
  updateEliminatedRowNum: Screen.updateEliminatedRowNum,
  updateNextShape: Screen.updateNextShape
});

Control.addDropEventHandler(Engine.onMoveDrop);
Control.addLeftEventHandler(Engine.onMoveLeft);
Control.addRightEventHandler(Engine.onMoveRight);
Control.addDownEventHandler(Engine.onMoveDown);
Control.addRotateEventHandler(Engine.onMoveRotate);
Control.addRestartEventHandler(Engine.onGameRestart);
Control.addPauseEventHandler(Engine.onGamePause);

Engine.start();
