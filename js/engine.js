define([
    '../js/var/tetris.js',
    "../js/components/blockBuilder.js",
    "../js/components/grid.js"
], function (tetris, builder, gridClass) {
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

        this.checkReachEnd = function (points) {
            return false;
        }

        this.calcScore = function (rows) {
            return 1;
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
                block.transform_down();
                grid.inactivatePoints(oldPoints).activatePoints(block.points);
            }
        }

        var getNewBlock = function () {
            let block = builder.getBlock();
            console.log("build a new block:" + block.points.map(p => "(x:" + p.x + ",y:" + p.y + ")").join(""));
            let offsetX = Math.floor(Math.random() * (grid.gridPointData[0].length - 2));
            console.log("offsetX=" + offsetX);
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