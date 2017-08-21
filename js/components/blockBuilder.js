define([
    '../../js/components/block.js'
], function (blockClass) {
    'use strict';

    const blockEnumeration = [
        [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
        [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 0, y: 2 }],
<<<<<<< HEAD
        [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
        [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]
=======
        [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }]
>>>>>>> 91c024b0f6ea6404a0d0e0e66d1865fb815d9d62
    ];

    var getBlock = function () {
        let index = Math.floor(Math.random() * blockEnumeration.length);
        return new blockClass(blockEnumeration[index]);
    }

    return {
        getBlock
    }
});