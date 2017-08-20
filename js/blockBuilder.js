define([
    '../js/block.js',
    "../js/data/blockEnum.js"
], function (blockConstructor, blockEnum) {
    'use strict';

    var getBlock = function () {
        let index = Math.floor(Math.random() * blockEnum.length);
        return new blockConstructor(blockEnum[index]);
    }

    return {
        getBlock
    }
});