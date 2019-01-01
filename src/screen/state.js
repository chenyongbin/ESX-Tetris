import { state as STATE_CONFIG, matrix as MATRIX_CONFIG } from "../config";
import Canvas from "../canvas";
import Block from "./block";
import DigitSequence from "./digitsequence";

let bgCanvas = null,
  canvas = null,
  scoreDigitSequence = null,
  eliminatedRowsDigitSequence = null;

const BLOCKS_MAP = {},
  getBlockKey = function(x, y) {
    return `KEY_${x}_${y}`;
  };

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

  width -= STATE_CONFIG.left;
  height -= STATE_CONFIG.top;
  let scoreHeight = height * 0.3,
    eliminatedRowsHeight = height * 0.3,
    nextBlockHeight = height * 0.4,
    scoreOffsetX = STATE_CONFIG.left,
    scoreOffsetY = STATE_CONFIG.top,
    eliminatedRowsOffsetX = STATE_CONFIG.left,
    eliminatedRowsOffsetY = STATE_CONFIG.top + scoreHeight,
    nextBlockOffsetX = STATE_CONFIG.left,
    nextBlockOffsetY = STATE_CONFIG.top + scoreHeight + eliminatedRowsHeight;

  let digitSequenceOffset = 5;
  canvas.context.font = STATE_CONFIG.font;
  canvas.fillText("得分", scoreOffsetX, scoreOffsetY);
  scoreDigitSequence = new DigitSequence(
    bgCanvas,
    canvas,
    scoreOffsetX + digitSequenceOffset,
    scoreOffsetY + STATE_CONFIG.fontSize,
    width - digitSequenceOffset
  );

  canvas.fillText("消除行", eliminatedRowsOffsetX, eliminatedRowsOffsetY);
  eliminatedRowsDigitSequence = new DigitSequence(
    bgCanvas,
    canvas,
    eliminatedRowsOffsetX + digitSequenceOffset,
    eliminatedRowsOffsetY + STATE_CONFIG.fontSize,
    width - digitSequenceOffset
  );

  canvas.fillText("下一个", nextBlockOffsetX, nextBlockOffsetY);
  let matrixOffsetX = nextBlockOffsetX,
    matrixOffsetY = nextBlockOffsetY + STATE_CONFIG.fontSize;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      let block = new Block(
        bgCanvas,
        matrixOffsetX + i * MATRIX_CONFIG.blockSize + 10,
        matrixOffsetY + j * MATRIX_CONFIG.blockSize,
        MATRIX_CONFIG.blockSize
      );
      block.activate(
        { strokeStyle: MATRIX_CONFIG.bgBlockBorderColor },
        { fillStyle: MATRIX_CONFIG.bgBlockBackgroundColor }
      );
      block.canvas = canvas;
      block.isActive = false;
      BLOCKS_MAP[getBlockKey(i, j)] = block;
    }
  }
};

const updateScore = function(score) {
  score = Number.parseInt(score);
  Number.isInteger(score) && scoreDigitSequence.show(score);
};

const updateEliminatedRowNum = function(rowNum) {
  rowNum = Number.parseInt(rowNum);
  Number.isInteger(rowNum) && eliminatedRowsDigitSequence.show(rowNum);
};

const updateNextBlock = function(coordinates) {
  if (!Array.isArray(coordinates)) return;
  for (let key in BLOCKS_MAP) {
    BLOCKS_MAP[key].inactivate();
  }
  coordinates.forEach(coordinate => {
    let block = BLOCKS_MAP[getBlockKey(coordinate.x + 1, coordinate.y + 1)];
    block &&
      block.activate(
        { strokeStyle: MATRIX_CONFIG.blockBorderColor },
        { fillStyle: MATRIX_CONFIG.blockBackgroundColor }
      );
  });
};

export default {
  initialize,
  updateScore,
  updateEliminatedRowNum,
  updateNextBlock
};
