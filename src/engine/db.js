/**
 * @file 数据库模块
 * @module dataBase
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

let sizeX = 0,
  sizeY = 0,
  length = 0;
let COORDINATES = [];

/**
 * 初始化
 * @param {integer} matrixSizeX 矩阵X轴方向大小
 * @param {integer} matrixSizeY 矩阵Y轴方向大小
 */
const initialize = (matrixSizeX, matrixSizeY) => {
  sizeX = matrixSizeX;
  sizeY = matrixSizeY;
  length = sizeX * sizeY;
  for (let j = 0; j < sizeY; j++) {
    let xArr = [];
    for (let i = 0; i < sizeX; i++) {
      xArr.push(0);
    }
    COORDINATES.push(xArr);
  }
};

/**
 * 更新坐标
 * @param {Array<Object<x,y>>} prevCoordinates 上一个坐标集
 * @param {Array<Object<x,y>>} curCoordinates 当前坐标集
 */
const update = (prevCoordinates, curCoordinates) => {
  prevCoordinates.forEach(({ x, y }) => {
    x < sizeX && x >= 0 && y < sizeY && y >= 0 && (COORDINATES[y][x] = 0);
  });
  curCoordinates.forEach(({ x, y }) => {
    x < sizeX && x >= 0 && y < sizeY && y >= 0 && (COORDINATES[y][x] = 1);
  });
};

/**
 * 检查是否都充满了
 * @returns
 */
const isAllFilled = () => {
  return COORDINATES[0].some(state => state == 1);
};

/**
 * 检查是否已到达左侧
 * @param {Array<Object<x,y>>} coordinates 坐标集
 * @returns boolean
 */
const checkWhetherHasReachedLeft = coordinates => {
  let hasReached = false;
  for (let i = 0; i < coordinates.length; i++) {
    let { x, y } = coordinates[i];
    if (x <= 0 || x >= sizeX || y < 0 || y >= sizeY) {
      hasReached = true;
      break;
    }

    if (
      coordinates.some(coordinate => x - 1 == coordinate.x && y == coordinate.y)
    )
      continue;

    if (COORDINATES[y][x - 1] == 1) {
      hasReached = true;
      break;
    }
  }
  return hasReached;
};

/**
 * 检查是否已到达右侧
 * @param {Array<Object<x,y>>} coordinates 坐标集
 * @returns boolean
 */
const checkWhetherHasReachedRight = coordinates => {
  let hasReached = false;
  for (let i = 0; i < coordinates.length; i++) {
    let { x, y } = coordinates[i];
    if (x < 0 || x >= sizeX - 1 || y < 0 || y >= sizeY) {
      hasReached = true;
      break;
    }

    if (
      coordinates.some(coordinate => x + 1 == coordinate.x && y == coordinate.y)
    )
      continue;

    if (COORDINATES[y][x + 1] == 1) {
      hasReached = true;
      break;
    }
  }
  return hasReached;
};

/**
 * 检查是否已到达底部
 * @param {Array<Object<x,y>>} coordinates 坐标集
 * @returns
 */
const checkWhetherHasReachedBottom = coordinates => {
  let hasReached = false;
  for (let i = 0; i < coordinates.length; i++) {
    let { x, y } = coordinates[i];
    if (x < 0 || x >= sizeX || y < 0 || y >= sizeY - 1) {
      hasReached = true;
      break;
    }

    if (
      coordinates.some(coordinate => x == coordinate.x && y + 1 == coordinate.y)
    )
      continue;

    if (COORDINATES[y + 1][x] == 1) {
      hasReached = true;
      break;
    }
  }
  return hasReached;
};

/**
 * 获取已填充满的行坐标
 * @returns Array<integer>
 */
const getFilledYCoordinates = () => {
  let yCoordinates = [];
  for (let y = sizeY - 1; y >= 0; y--) {
    if (!COORDINATES[y].some(state => state == 1)) break;
    if (COORDINATES[y].every(state => state == 1)) {
      for (let x = 0; x < sizeX; x++) {
        COORDINATES[y][x] = 0;
      }
      yCoordinates.push(y);
    }
  }
  return yCoordinates;
};

/**
 * 填满若干行之后，重置整个坐标系
 * @param {Array<integer>} yCoordinates 已填满的行坐标
 * @param {function} callback 回调函数
 */
const reset = (yCoordinates, callback) => {
  let inactives = [],
    actives = [];

  yCoordinates.sort((a, b) => b - a);
  let y = yCoordinates[0],
    emptyY = y;
  while (y >= 0 && y < sizeY) {
    if (COORDINATES[y].some(state => state == 1)) {
      inactives = [];
      actives = [];
      for (let x = 0; x < sizeX; x++) {
        if (COORDINATES[y][x] == 1) {
          COORDINATES[y][x] = 0;
          inactives.push({ x: x, y: y });
          COORDINATES[emptyY][x] = 1;
          actives.push({ x: x, y: emptyY });
        }
      }

      emptyY--;
      if (inactives.length > 0 || actives.length > 0) {
        callback && callback(inactives, actives);
      }
    }
    y--;
  }
};

/**
 * 清空所有状态
 */
const clear = function() {
  COORDINATES.forEach(xArr => {
    for (let x = 0; x < xArr.length; x++) {
      xArr[0] = 0;
    }
  });
};

export default {
  initialize,
  update,
  isAllFilled,
  checkWhetherHasReachedLeft,
  checkWhetherHasReachedRight,
  checkWhetherHasReachedBottom,
  getFilledYCoordinates,
  reset,
  clear
};
