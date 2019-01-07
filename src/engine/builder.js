/**
 * @file 方块生成器模块
 * @module builder
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

import Character from "./character";

/**
 * 田字型方块
 */
const SquareShape = [
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
];

/**
 * L字型方块
 */
const LShape = [
  [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }],
  [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }]
];

/**
 * 反L型方块
 */
const ReverseLShape = [
  [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }],
  [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }]
];

/**
 * 山字型方块
 */
const MoutainShape = [
  [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }],
  [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 1 }],
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }],
  [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }]
];

/**
 * 直线型方块
 */
const LineShape = [
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }],
  [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }]
];

/**
 * 小H型方块
 */
const LittleHShape = [
  [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 1 }],
  [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 2 }]
];

/**
 * 反小H型方块
 */
const ReverseLittleHShape = [
  [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }],
  [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }]
];

/**
 * 生成一个图形
 * @returns {object} 一个模块图形
 */
const getShape = sizeX => {
  let shapes = [
    SquareShape,
    LShape,
    ReverseLShape,
    MoutainShape,
    LineShape,
    LittleHShape,
    ReverseLittleHShape
  ];
  let rand = Math.floor(Math.random() * shapes.length),
    offsetX = 0,
    offsetY = 0;
  let shape = shapes[rand];
  for (let { x, y } of shape[0]) {
    if (offsetY < y) offsetY = y;
    if (offsetX < x) offsetX = x;
  }

  return new Character(
    Math.floor((sizeX - offsetX) / 2),
    -1 * offsetY,
    ...shape
  );
};

export default {
  getShape
};
