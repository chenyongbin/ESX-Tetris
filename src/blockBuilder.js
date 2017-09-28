import "babel-polyfill";
import BlockBase from "./block";

class ShapeHBlock extends BlockBase {
    constructor() {
        super(
            [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 1 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }]
        );
    }
}

class ShapeInvertedHBlock extends BlockBase {
    constructor() {
        super(
            [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }],
            [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
        );
    }
}

class ShapeLBlock extends BlockBase {
    constructor() {
        super(
            [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
            [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
        );
    }
}

class ShapeInvertedLBlock extends BlockBase {
    constructor() {
        super(
            [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }],
            [{ x: 0, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 2 }, { x: 0, y: 1 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }]
        );
    }
}

class ShapeMountainBlock extends BlockBase {
    constructor() {
        super(
            [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }],
            [{ x: 1, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }],
            [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }]
        );
    }
}

class ShapeTableBlock extends BlockBase {
    constructor() {
        super(
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
        );
    }
}

class ShapeVerticalLineBlock extends BlockBase {
    constructor() {
        super(
            [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]
        );
    }
}

const getBlock = function () {
    const blockSorts = [ShapeHBlock,
        ShapeInvertedHBlock,
        ShapeLBlock,
        ShapeInvertedLBlock,
        ShapeMountainBlock,
        ShapeTableBlock,
        ShapeVerticalLineBlock
    ];

    let index = Math.floor(Math.random() * blockSorts.length);
    return new blockSorts[index]();
}

export {
    getBlock
};