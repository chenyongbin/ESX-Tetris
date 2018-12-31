import Canvas from "../canvas";
import Block from "./block";
import DigitSequence from "./digitsequence";

let bgCanvas = null,
  canvas = null;

const initialize = function(containerDOM, offsetX, offsetY, width, height) {
  bgCanvas = new Canvas(
    containerDOM,
    offsetX,
    offsetY,
    width,
    height,
    "State Background Canvas"
  );
  bgCanvas.setStyles([
    "position:absolute;",
    `top:${offsetY}px;`,
    `left:${offsetX}px;`,
    "z-index:2;"
  ]);

  canvas = new Canvas(
    containerDOM,
    offsetX,
    offsetY,
    width,
    height,
    "State Main Canvas"
  );
  canvas.setStyles([
    "position:absolute;",
    `top:${offsetY}px;`,
    `left:${offsetX}px;`,
    "z-index:3;"
  ]);

  canvas.context.font = "16px Arial";
  canvas.fillText("得分", 20, 20);
  DigitSequence.initialize(30, 30, width - 35, bgCanvas, canvas);
  DigitSequence.show(235670);
  // DigitSequence.reset();
};

const updateScore = function(score) {};

const updateEliminatedRowNum = function(rowNum) {};

const updateNextBlock = function() {};

const updateSystemState = function({
  currentTime = "",
  runningState = "",
  isTurnOnVoice = false
}) {};

export default {
  initialize,
  updateScore,
  updateEliminatedRowNum,
  updateNextBlock,
  updateSystemState
};
