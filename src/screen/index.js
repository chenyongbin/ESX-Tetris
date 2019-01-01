import { screen as SCREEN_CONFIG, matrix as MATRIX_CONFIG } from "../config";
import Matrix from "./matrix";
import State from "./state";

let paddingX = 0,
  paddingY = 0,
  horizontalBlockNumber = 0,
  verticalBlockNumber = 0,
  matrixWidthProportion = 0.7;

const initialize = function(containerDOM, { offsetX, offsetY, width, height }) {
  if (MATRIX_CONFIG.blockSize * 13 + 4 * MATRIX_CONFIG.borderWidth > width)
    throw new Error("屏幕所占宽度太小");
  if (MATRIX_CONFIG.blockSize * 15 + 4 * MATRIX_CONFIG.borderWidth > height)
    throw new Error("屏幕所占高度太小");

  width -= 4 * MATRIX_CONFIG.borderWidth;
  height -= 4 * MATRIX_CONFIG.borderWidth;
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

  offsetX += paddingX;
  offsetY += paddingY;
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

export default {
  initialize,
  activate: Matrix.activate,
  inactivate: Matrix.inactivate,
  highlight: Matrix.highlight,
  updateScore: State.updateScore,
  updateEliminatedRowNum: State.updateEliminatedRowNum,
  updateNextBlock: State.updateNextBlock
};
