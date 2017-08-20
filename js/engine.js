define([
    '../js/var/tetris.js',
    "../js/blockBuilder.js",
    "../js/grid.js"
], function (tetris, builder) {
    'use strict';

    function Engine() {
        if (!(this instanceof Engine)) {
            return new Engine();
        }

        var self = this;

        // Private properties
        var privateInterval = 5000;

        this.totalScore = 0;
        this.lastScore = 0;

        this.activeBlock = null;
        this.activeBlockId = -1;
        this.interval = privateInterval;

        this.start = function () {
            createActiveBlock();
        }

        this.stop = function () {
            disposeActiveBlock();
        }

        this.transform_down = function () {
            self.interval = self.interval / 2;
        }

        this.transform_left = function () {
            self.activeBlock && self.activeBlock.transform_left();
        }

        this.transform_right = function () {
            self.activeBlock && self.activeBlock.transform_right();
        }

        this.transform_rotate = function () {
            self.activeBlock && self.activeBlock.transform_rotate();
        }

        this.refreshBlock = function (newPoints, oldPoints) {
            tetris.grid.refreshBlock(newPoints, oldPoints);
        }

        this.checkReachEnd = function (points) {
            return false;
        }

        this.getFillFullRows = function () { }

        this.calcScore = function (rows) {
            return 1;
        }

        // Private methods
        var intervalHandler = function (block) {
            let oldPoints = [];
            block.points.map(point => oldPoints.push({ x: point.x, y: point.y }));

            block.transform_down();
            self.refreshBlock(block.points, oldPoints);

            if (self.checkReachEnd(self.activeBlock.points)) {
                disposeActiveBlock();
                let fulfiledRows = self.getFillFullRows();
                if (fulfiledRows) {
                    tetris.grid.clearFillFullRows(fulfiledRows);
                    self.lastScore = self.calcScore();
                    self.totalScore += self.lastScore;
                }
                createActiveBlock();
            }
        }

        var getNewBlock = function () {
            let block = builder.getBlock();

            let offsetX = Math.floor(Math.random() * (tetris.data[0].length - 2));
            block.points.map(point => point.x += offsetX);

            return block;
        }

        var createActiveBlock = function () {
            self.activeBlock = getNewBlock();
            self.activeBlockId = setInterval(() => intervalHandler(self.activeBlock), self.interval);
        }

        var disposeActiveBlock = function () {
            self.activeBlock = null;
            clearInterval(self.activeBlockId);
            self.activeBlockId = -1;
        }
    }

    tetris.engine = new Engine();
});