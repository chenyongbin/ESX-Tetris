/**
 * @file 方块生成器模块
 * @module builder
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

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

class Block {
    constructor(shapeCoordinatesMatrix) {
        this._shapeCoorinatesMatrix = shapeCoordinatesMatrix;
        this._state = 0;
        this._offsetX = 0;
        this._offsetY = 0;
        this.coordinates = [];
        this.lastCoordinates = [];
    }

    rotate() {
        if (this._state < (this._shapeCoorinatesMatrix.length - 1))
            this._state++;
        else
            this._state = 0;
        this._calculateCoordinates();
    }

    left() {
        this._offsetX--;
        this._calculateCoordinates();
    }

    right() {
        this._offsetX++;
        this._calculateCoordinates();
    }

    down() {
        this._offsetY++;
        this._calculateCoordinates();
    }

    _calculateCoordinates() {
        if (this.coordinates.length) {
            this.lastCoordinates = [];
            for (let coordinate of this.coordinates) {
                this.lastCoordinates.push(coordinate);
            }
        }

        this.coordinates = [];
        for (let coordinate of this._shapeCoorinatesMatrix[this._state]) {
            coordinate.x += this._offsetX;
            coordinate.y += this._offsetY;
            this.coordinates.push(coordinate);
        }
    }
}

/**
 * 生成一个方块对象
 * @returns {object} 一个模块对象
 */
const getBlock = () => {
    let blocks = [SquareShape, LShape, ReverseLShape, MoutainShape, LineShape, LittleHShape, ReverseLittleHShape];
    let rand = Math.floor(Math.random() * blocks.length);
    return new Block(blocks[rand]);
}

export default {
    getBlock
};