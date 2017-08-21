define([
    '../../js/components/block.js'
], function (blockClass) {
    'use strict';

    const blockEnumeration = [
        [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
        [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 2 }],
        [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }]
    ];

    var getBlock = function () {
        let index = Math.floor(Math.random() * blockEnumeration.length);
        return new blockClass(blockEnumeration[index]);
    }

    return {
        getBlock
    }
});