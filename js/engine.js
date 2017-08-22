define([
    '../js/var/tetris.js',
    "../js/common.js",
    "../js/blockBuilder.js",
    "../js/grid.js"
], function (tetris, comm, builder, grid) {
    'use strict';

    function Engine() {
        if (!(this instanceof Engine)) {
            return new Engine();
        }

        // Private variables
        var self = this;
        var interval = 500;
        var activeBlock = null;
        var nextBlock = null;
        var activeBlockId = -1;
        var scoreChangeHandlerSet = new Set();
        var blockChangeHandlerSet = new Set();

        // Private methods
        var calcScore = function (rows) {
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

        var executeScoreChangeHandlers = function (score, totalScore) {
            for (let handler of scoreChangeHandlerSet) {
                handler && handler(score, totalScore);
            }
        }

        var intervalHandler = function (block) {
            let oldPositions = [];
            block.positions.map(p => oldPositions.push({ x: p.x, y: p.y }));

            if (grid.checkReachBottom(block.positions)) {
                disposeActiveBlock();
                let activeRows = grid.getActiveRows();
                if (activeRows && activeRows.length) {
                    tetris.lastScore = calcScore(activeRows);
                    tetris.totalScore += tetris.lastScore;
                    executeScoreChangeHandlers(tetris.lastScore, tetris.totalScore);
                    grid.inactivateRows(activeRows).repaint();
                }
                createActiveBlock();
            } else {
                block.transform.down();
                grid.inactivatePositions(oldPositions).activatePositions(block.positions);
            }
        }

        var getNewBlock = function () {
            let block = builder.getBlock();
            let offsetX = Math.floor(Math.random() * (grid.gridData[0].length - block.getMaxOffsetX()));
            block.positions.map(p => p.x += offsetX);

            return block;
        }

        var executeBlockChangeHandlers = function (block) {
            for (let handler of blockChangeHandlerSet) {
                handler && handler(block.positions);
            }
        }

        var createActiveBlock = function () {
            if (!nextBlock) {
                nextBlock = getNewBlock();
            }

            activeBlock = nextBlock;

            nextBlock = getNewBlock();
            executeBlockChangeHandlers(nextBlock);

            if (grid.checkReachBottom(activeBlock.positions)) {
                disposeActiveBlock();
                console.log("You fail.");
            } else {
                grid.activatePositions(activeBlock.positions);
                activeBlockId = setInterval(() => intervalHandler(activeBlock), interval);
            }
        }

        var disposeActiveBlock = function () {
            activeBlock = null;
            clearInterval(activeBlockId);
            activeBlockId = -1;
        }

        // Public functions
        this.start = function () {
            createActiveBlock();
        }

        this.stop = function () {
            disposeActiveBlock();
        }

        this.addScoreChangeHandler = function (handler) {
            handler && scoreChangeHandlerSet.add(handler);
        }

        this.addBlockChangeHandler = function (handler) {
            handler && blockChangeHandlerSet.add(handler);
        }

        this.transform = {
            down: function () {
                if (activeBlock && !grid.checkReachBottom(activeBlock.positions)) {
                    let oldPositions = [];
                    activeBlock.positions.map(p => oldPositions.push({ x: p.x, y: p.y }));
                    activeBlock.transform.down();
                    grid.inactivatePositions(oldPositions).activatePositions(activeBlock.positions);
                }
            },
            left: function () {
                if (activeBlock && !grid.checkReachLeft(activeBlock.positions)) {
                    let oldPositions = [];
                    activeBlock.positions.map(p => oldPositions.push({ x: p.x, y: p.y }));
                    activeBlock.transform.left();
                    grid.inactivatePositions(oldPositions).activatePositions(activeBlock.positions);
                }
            },
            right: function () {
                if (activeBlock && !grid.checkReachRight(activeBlock.positions)) {
                    let oldPositions = [];
                    activeBlock.positions.map(p => oldPositions.push({ x: p.x, y: p.y }));
                    activeBlock.transform.right();
                    grid.inactivatePositions(oldPositions).activatePositions(activeBlock.positions);
                }
            },
            rotate: function () {
                if (activeBlock && !grid.checkReachLeft(activeBlock.positions)
                    && !grid.checkReachRight(activeBlock.positions)
                    && !grid.checkReachBottom(activeBlock.positions)) {
                    let oldPositions = [];
                    activeBlock.positions.map(p => oldPositions.push({ x: p.x, y: p.y }));
                    activeBlock.transform.rotate();
                    grid.inactivatePositions(oldPositions).activatePositions(activeBlock.positions);
                }
            }
        }
    }

    var singletonEngine = new Engine();

    return singletonEngine;
});