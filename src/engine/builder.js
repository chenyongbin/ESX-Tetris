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
 * 生成一个方块对象
 * @returns {object} 一个模块对象
 */
const getCharacter = sizeX => {
  let characters = [
    SquareShape,
    LShape,
    ReverseLShape,
    MoutainShape,
    LineShape,
    LittleHShape,
    ReverseLittleHShape
  ];
  let rand = Math.floor(Math.random() * characters.length),
    offsetX = Math.floor(Math.random() * (sizeX - 4));
  return new Character(offsetX, ...characters[rand]);
};

export default {
  getCharacter
};
