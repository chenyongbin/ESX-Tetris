/**
 * @file 方块生成器模块
 * @module builder
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

const SquareShape = [
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
];

const TShape = [
    [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }],
    [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
    [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
];

class Block {
    constructor(originalShapeCoordinates) {
        this._originalShapeCoorinates = originalShapeCoordinates;
        this._rotateState = 0;
        this._offsetX = 0;
        this._offsetY = 0;
    }

    rotate() {
        if (this._rotateState < (this._originalShapeCoorinates.length - 1))
            this._rotateState++;
        else
            this._rotateState = 0;
    }

    left() {
        this._offsetX--;
    }

    right() {
        this._offsetX++;
    }

    down() {
        this._offsetY++;
    }

    getCoordinates() { }
}

/**
 * 生成一个方块对象
 * @returns {object} 一个模块对象
 */
const getBlock = () => {
    let blocks = [SquareShape, TShape];
    let rand = Math.floor(Math.random() * blocks.length);
    return new Block(blocks[rand]);
}

export default {
    getBlock
};