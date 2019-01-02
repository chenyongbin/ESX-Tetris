import { matrix as MATRIX_CONFIG } from "../config";
import Canvas from "../canvas";
import Block from "./block";

let bgCanvas = null,
  canvas = null,
  horizontalSize = 0,
  verticalSize = 0;

const BLOCKS_MAP = {},
  getBlockKey = function(x, y) {
    return `KEY_${x}_${y}`;
  };

const initialize = function(
  containerDOM,
  offsetX,
  offsetY,
  width,
  height,
  horizontalBlockNumber,
  verticalBlockNumber
) {
  horizontalSize = horizontalBlockNumber;
  verticalSize = verticalBlockNumber;

  bgCanvas = new Canvas(
    containerDOM,
    offsetX,
    offsetY,
    width,
    height,
    "Matrix Background Canvas"
  );
  bgCanvas.setStyles(["z-index:2;"]);

  canvas = new Canvas(
    containerDOM,
    offsetX,
    offsetY,
    width,
    height,
    "Matrix Main Canvas"
  );
  canvas.setStyles(["z-index:3;"]);

  for (let i = 0; i < horizontalSize; i++) {
    for (let j = 0; j < verticalSize; j++) {
      let block = new Block(
        bgCanvas,
        i * MATRIX_CONFIG.blockSize + MATRIX_CONFIG.borderWidth,
        j * MATRIX_CONFIG.blockSize + MATRIX_CONFIG.borderWidth,
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

  canvas.strokeRect(0, 0, width, height, {
    lineWidth: MATRIX_CONFIG.borderWidth
  });
};

const activate = function(coordinates) {
  if (!Array.isArray(coordinates)) return;
  coordinates.forEach(({ x, y }) => {
    let block = BLOCKS_MAP[getBlockKey(x, y)];
    block &&
      block.activate(
        { strokeStyle: MATRIX_CONFIG.blockBorderColor },
        { fillStyle: MATRIX_CONFIG.blockBackgroundColor }
      );
  });
};

const inactivate = function(coordinates) {
  if (!Array.isArray(coordinates)) return;
  coordinates.forEach(({ x, y }) => {
    let block = BLOCKS_MAP[getBlockKey(x, y)];
    block && block.inactivate();
  });
};

const highlightAnimation = function(yCoordinates, count, timer) {
  yCoordinates.forEach(y => {
    if (!Number.isNaN(y) && y >= 0 && y < verticalSize) {
      for (let i = 0; i < horizontalSize; i++) {
        let block = BLOCKS_MAP[getBlockKey(i, y)];
        if (!block) continue;
        if (count % 2 == 0) {
          block.inactivate();
        } else {
          block.activate(
            { strokeStyle: MATRIX_CONFIG.highlightBlockBorderColor },
            { fillStyle: MATRIX_CONFIG.highlightBlockBackgroundColor }
          );
        }
      }
    }
  });

  count--;
  timer && clearTimeout(timer);
  if (count >= 0) {
    timer = setTimeout(() => {
      return highlightAnimation(yCoordinates, count, timer);
    }, 200);
  }
};

const highlight = function(yCoordinates) {
  if (!Array.isArray(yCoordinates) || yCoordinates.length == 0) return;
  highlightAnimation(yCoordinates, 5);
};

export default {
  initialize,
  activate,
  inactivate,
  highlight
};
