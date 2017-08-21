define([
    '../js/var/tetris.js',
    "../js/common.js",
    "../js/components/blockBuilder.js",
    "../js/components/grid.js"
], function (tetris, comm, builder, gridClass) {
    'use strict';

    function Engine() {
        if (!(this instanceof Engine)) {
            return new Engine();
        }

        var self = this;
        var grid = null;

        // Private properties
        var privateInterval = 200;

        this.totalScore = 0;
        this.lastScore = 0;

        this.activeBlock = null;
        this.activeBlockId = -1;
        this.interval = privateInterval;

        this.start = function () {
            grid = new gridClass($("#container"), 400, 500);
            createActiveBlock();
        }

        this.stop = function () {
            disposeActiveBlock();
        }

        this.calcScore = function (rows) {
            let score = 0;
            let lastR = -1, calcCount = 1;

            rows.sort((a, b) => a - b).forEach(r => {
                if (lastR < 0) {
                    lastR = r;
                } else if (r - lastR == 1) {
                    calcCount++;
                } else {
                    lastR = r;
                    calcCount = 1;
                    score += comm.getFibonacciValue(calcCount) * 10;
                }
            });

            return score;
        }

        // Private methods
        var intervalHandler = function (block) {
            let oldPoints = [];
            block.points.map(point => oldPoints.push({ x: point.x, y: point.y }));

            if (grid.checkReachEnd(block.points)) {
                disposeActiveBlock();
                let activeRows = grid.getActiveRows();
                if (activeRows && activeRows.length) {
                    self.lastScore = self.calcScore(activeRows);
                    self.totalScore += self.lastScore;
                    grid.inactivateRows(activeRows).repaint();
                }
                createActiveBlock();
            } else {
                block.transform.down();
                grid.inactivatePoints(oldPoints).activatePoints(block.points);
            }
        }

        var getNewBlock = function () {
            let block = builder.getBlock();
            let offsetX = Math.floor(Math.random() * (grid.gridPointData[0].length - 4));
            block.points.map(point => point.x += offsetX);

            return block;
        }

        var createActiveBlock = function () {
            self.activeBlock = getNewBlock();
            if (grid.checkReachEnd(self.activeBlock.points)) {
                disposeActiveBlock();
                console.log("You fail.");
            } else {
                grid.activatePoints(self.activeBlock.points);
                self.activeBlockId = setInterval(() => intervalHandler(self.activeBlock), self.interval);
            }
        }

        var disposeActiveBlock = function () {
            self.activeBlock = null;
            clearInterval(self.activeBlockId);
            self.activeBlockId = -1;
        }
    }

    tetris.engine = new Engine();
});