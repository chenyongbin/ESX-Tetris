define([
    '../js/block.js'
], function (blockConstructor) {
    'use strict';

    const blockArray = [
        // Shape like H
        [
            [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 1 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }]
        ],
        // Shape like inverted H
        [
            [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }],
            [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
        ],
        // Shape L
        [
            [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }],
            [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
        ],
        // Shape like inverted L
        [
            [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }],
            [{ x: 0, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 2 }, { x: 0, y: 1 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }]
        ],
        // Shape like inverted T
        [
            [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 1 }],
            [{ x: 1, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }],
            [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }]
        ],
        // Shape like 田
        [
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }]
        ],
        // Shape like one vertical line
        [
            [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]
        ]
    ];

    var getBlock = function () {
        let index = Math.floor(Math.random() * blockArray.length);
        let newBlock = new blockConstructor(blockArray[index]);
        Reflect.preventExtensions(newBlock);
        return newBlock;
    }

    return {
        getBlock
    }
});