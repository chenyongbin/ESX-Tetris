/**
 * @file 屏幕状态模块
 * @version 1.0.0
 */

import { state as STATE_CONFIG, matrix as MATRIX_CONFIG } from "../config";
import Canvas from "../canvas";
import Block from "./block";
import DigitSequence from "./digitsequence";

let bgCanvas = null,
  canvas = null,
  scoreDigitSequence = null,
  eliminatedRowsDigitSequence = null;

const BLOCKS_MAP = {},
  getBlockKey = (x, y) => {
    return `KEY_${x}_${y}`;
  };

const initialize = (containerDOM, offsetX, offsetY, width, height) => {
  bgCanvas = new Canvas(
    containerDOM,
    offsetX,
    offsetY,
    width,
    height,
    "State Background Canvas"
  );
  bgCanvas.setStyles(["z-index:2;"]);

  canvas = new Canvas(
    containerDOM,
    offsetX,
    offsetY,
    width,
    height,
    "State Main Canvas"
  );
  canvas.setStyles(["z-index:3;"]);

  width -= STATE_CONFIG.left;
  height -= STATE_CONFIG.top;
  let scoreHeight = height * 0.3,
    eliminatedRowsHeight = height * 0.3,
    nextBlockHeight = height * 0.4,
    scoreOffsetX = STATE_CONFIG.left,
    scoreOffsetY = STATE_CONFIG.top,
    eliminatedRowsOffsetX = STATE_CONFIG.left,
    eliminatedRowsOffsetY = STATE_CONFIG.top + scoreHeight,
    nextShapeOffsetX = STATE_CONFIG.left,
    nextShapeOffsetY = STATE_CONFIG.top + scoreHeight + eliminatedRowsHeight;

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

  canvas.fillText("下一个", nextShapeOffsetX, nextShapeOffsetY);
  let matrixOffsetX = nextShapeOffsetX,
    matrixOffsetY = nextShapeOffsetY + STATE_CONFIG.fontSize;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 2; j++) {
      let block = new Block(
        bgCanvas,
        matrixOffsetX + i * MATRIX_CONFIG.blockSize,
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

const updateScore = score => {
  score = Number.parseInt(score);
  score > 0 ? scoreDigitSequence.show(score) : scoreDigitSequence.reset();
};

const updateEliminatedRowNum = rowNum => {
  rowNum = Number.parseInt(rowNum);
  rowNum > 0
    ? eliminatedRowsDigitSequence.show(rowNum)
    : eliminatedRowsDigitSequence.reset();
};

const updateNextShape = coordinates => {
  if (!Array.isArray(coordinates)) return;
  for (let key in BLOCKS_MAP) {
    BLOCKS_MAP[key].inactivate();
  }
  if (coordinates.length == 0) return;
  coordinates.forEach(coordinate => {
    let block = BLOCKS_MAP[getBlockKey(coordinate.x, coordinate.y)];
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
  updateNextShape
};
