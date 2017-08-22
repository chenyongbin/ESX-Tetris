define([
    '../js/block.js'
], function (blockClass) {
    'use strict';

    const blockEnumeration = [
        [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
        [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 2 }],
        [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
        [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]
    ];

    var getBlock = function () {
        let index = Math.floor(Math.random() * blockEnumeration.length);
        return new blockClass(blockEnumeration[1]);
    }

    return {
        getBlock
    }
});