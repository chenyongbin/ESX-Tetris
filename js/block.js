define(function () {
    'use strict';

    function Block(positionArray) {
        if (!(this instanceof Block)) {
            return new Block(positionArray);
        }

        if (!positionArray || !(positionArray instanceof Array) || positionArray.length == 0) {
            throw new Error("The positions is invalid or null.");
        }

        // Private variables
        let self = this;
        let positions = [];
        let positionsChangedHandlerSet = new Set();

        // Private methods
        let executePositionsChangedHandler = function () {
            for (let handler of positionsChangedHandlerSet) {
                handler && handler(self.getPositions());
            }
        }

        // Public properties
        this.transition = {
            down: function () {
                positions.map(point => point.y += 1);
                executePositionsChangedHandler();
            },
            left: function () {
                positions.map(point => point.x -= 1);
                executePositionsChangedHandler();
            },
            right: function () {
                positions.map(point => point.x += 1);
                executePositionsChangedHandler();
            },
            rotate: function () {
                positions.map(p => {
                    let x = p.x, y = p.y;
                    p.y = x;
                    p.x = y;
                });
                executePositionsChangedHandler();
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

        this.initializeStartPositions = function (newPositions) {
            positions = newPositions;
        }

        positionArray.forEach(p => positions.push({ x: p.x, y: p.y }));
    }

    return Block;
});