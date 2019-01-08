/**
 * @file 屏幕模块
 * @version 1.0.0
 */

import { screen as SCREEN_CONFIG, matrix as MATRIX_CONFIG } from "../config";
import Matrix from "./matrix";
import State from "./state";

let paddingX = 0,
  paddingY = 0,
  horizontalBlockNumber = 0,
  verticalBlockNumber = 0,
  matrixWidthProportion = 0.7;

/**
 * 初始化
 * @param {element} containerDOM 容器DOM对象
 * @param {object} { offsetX, offsetY, width, height }
 */
const initialize = (containerDOM, { offsetX, offsetY, width, height }) => {
  width = width - 4 * MATRIX_CONFIG.borderWidth - 2 * SCREEN_CONFIG.padding;
  height = height - 4 * MATRIX_CONFIG.borderWidth - 2 * SCREEN_CONFIG.padding;
  horizontalBlockNumber = Math.floor(width / MATRIX_CONFIG.blockSize);
  verticalBlockNumber = Math.floor(height / MATRIX_CONFIG.blockSize);
  if (width % MATRIX_CONFIG.blockSize == 0) {
    horizontalBlockNumber--;
    paddingX = MATRIX_CONFIG.blockSize / 2;
  } else {
    paddingX = (width - horizontalBlockNumber * MATRIX_CONFIG.blockSize) / 2;
  }
  if (height % MATRIX_CONFIG.blockSize == 0) {
    verticalBlockNumber--;
    paddingY = MATRIX_CONFIG.blockSize / 2;
  } else {
    paddingY = (height - verticalBlockNumber * MATRIX_CONFIG.blockSize) / 2;
  }

  offsetX = offsetX + paddingX + SCREEN_CONFIG.padding;
  offsetY = offsetY + paddingY + SCREEN_CONFIG.padding;
  horizontalBlockNumber = Math.floor(
    horizontalBlockNumber * matrixWidthProportion
  );

  let matrixWidth =
      MATRIX_CONFIG.blockSize * horizontalBlockNumber +
      2 * MATRIX_CONFIG.borderWidth,
    matrixHeight =
      MATRIX_CONFIG.blockSize * verticalBlockNumber +
      2 * MATRIX_CONFIG.borderWidth;

  Matrix.initialize(
    containerDOM,
    offsetX,
    offsetY,
    matrixWidth,
    matrixHeight,
    horizontalBlockNumber,
    verticalBlockNumber
  );

  State.initialize(
    containerDOM,
    offsetX + matrixWidth,
    offsetY,
    width - 2 * paddingX - matrixWidth,
    height - 2 * paddingY
  );
};

/**
 * 获取屏幕矩阵尺寸
 * @returns
 */
const getSize = () => {
  return {
    matrixSizeX: horizontalBlockNumber,
    matrixSizeY: verticalBlockNumber
  };
};

export default {
  initialize,
  getSize,
  activate: Matrix.activate,
  inactivate: Matrix.inactivate,
  highlight: Matrix.highlight,
  unhighlight: Matrix.unhighlight,
  updateScore: State.updateScore,
  updateEliminatedRowNum: State.updateEliminatedRowNum,
  updateNextShape: State.updateNextShape
};
