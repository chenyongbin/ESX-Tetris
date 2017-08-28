define(["js/common.js"], function (comm) {
    'use strict';

    function Block(blockStates) {
        if (!(this instanceof Block)) {
            return new Block(blockStates);
        }

        if (!blockStates || !(blockStates instanceof Array) || blockStates.length == 0) {
            throw new Error("The blcok states were invalid or null.");
        }

        // Private variables
        let self = this,
            positions = [],
            positionsChangedHandlerSet = new Set();

        let curBlockStates = [],
            curStateIndex = 0,
            offsetX = 0,
            offsetY = 0;

        // Private methods
        let executePositionsChangedHandler = function () {
            for (let handler of positionsChangedHandlerSet) {
                handler && handler(self.getPositions());
            }
        }

        let resetPositions = function () {
            positions = [];
            curBlockStates[curStateIndex].forEach(p => {
                positions.push({
                    x: p.x + offsetX,
                    y: p.y + offsetY
                });
            });
            executePositionsChangedHandler();
        }

        // Public properties
        this.transition = {
            down: function () {
                offsetY++;
                resetPositions();
            },
            left: function () {
                offsetX--;
                resetPositions();
            },
            right: function () {
                offsetX++;
                resetPositions();
            },
            rotate: function () {
                if (curStateIndex == (curBlockStates.length - 1)) {
                    curStateIndex = 0;
                } else {
                    curStateIndex++;
                }
                resetPositions();
            }
        }

        // Public functions
        this.addPositionsChangedHandler = function (handler) {
            handler && positionsChangedHandlerSet.add(handler);
        }

        this.getPositions = function () {
            let copyPositions = [];
            positions.map(p => copyPositions.push({ x: p.x, y: p.y }));
            return copyPositions;
        }

        this.adjustPositions = function (x, y) {
            offsetX = x;
            offsetY = y;
            resetPositions();
        }

        blockStates.forEach(p => curBlockStates.push(p));
        resetPositions();
    }

    return Block;
});