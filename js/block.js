define(function () {
    'use strict';

    function Block(positions) {
        if (!(this instanceof Block)) {
            return new Block(positions);
        }

        if (!positions || !(positions instanceof Array) || positions.length == 0) {
            throw new Error("The positions is invalid or null.");
        }

        // Private variables
        var self = this;

        // Private methods
        var getBlockInfo = function () {
            if (!self.positions || self.positions.length == 0) {
                return null;
            }

            let minX = 0, maxX = 0, minY = 0, maxY = 0;

            let sortedPositions1 = self.positions.sort((p1, p2) => p1.x - p2.x);
            minX = sortedPositions1[0].x;
            maxX = sortedPositions1[sortedPositions1.length - 1].x;

            let sortedPositions2 = self.positions.sort((p1, p2) => p1.y - p2.y);
            minY = sortedPositions2[0].y;
            maxY = sortedPositions2[sortedPositions2.length - 1].y;

            return {
                minX, maxX, minY, maxY
            };
        }

        // Public properties
        this.positions = [];

        this.transform = {
            down: function () {
                self.positions.map(point => point.y += 1);
            },

            left: function () {
                self.positions.map(point => point.x -= 1);
            },

            right: function () {
                self.positions.map(point => point.x += 1);
            },

            rotate: function () {
                let blockInfo = getBlockInfo();
                if (blockInfo) {
                    self.positions.map(p => {
                        let x = p.x, y = p.y;
                        p.y = x;
                        p.x = y;
                    });
                }
            }
        }

        // Public functions
        this.getMaxOffsetX = function () {
            let sortedPositions = self.positions.sort((p1, p2) => p2.x - p1.x);
            if (!sortedPositions || sortedPositions.length == 0) {
                throw new Error("The positions was invalid.");
            }

            return sortedPositions[0].x + 1;
        }

        positions.forEach(point => self.positions.push({ x: point.x, y: point.y }));
    }

    return Block;
});