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
        let self = this;
        let interval = 1000;
        let activeBlock = null;
        let nextBlock = null;
        let activeBlockId = -1;
        let scoreChangeHandlerSet = new Set();
        let blockChangeHandlerSet = new Set();

        // Private methods
        let calcScore = function (rows) {
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

            if (calcCount > 0) {
                score += comm.getFibonacciValue(calcCount) * 10;
            }

            return score;
        }

        let executeScoreChangeHandlers = function (score, totalScore, clearRowCount) {
            for (let handler of scoreChangeHandlerSet) {
                handler && handler(score, totalScore, clearRowCount);
            }
        }

        let reachBottomHandler = function () {
            disposeActiveBlock();
            let activeRows = grid.getActiveRows();
            if (activeRows && activeRows.length) {
                tetris.lastScore = calcScore(activeRows);
                tetris.totalScore += tetris.lastScore;

                grid.highlightRows(activeRows);
                setTimeout(() => {
                    grid.unhighlightRows(activeRows).inactivateRows(activeRows).repaint();
                    createActiveBlock();
                    executeScoreChangeHandlers(tetris.lastScore, tetris.totalScore, activeRows.length);
                }, 300);
            } else {
                createActiveBlock();
            }
        }

        let getNewBlock = function () {
            let block = null;

            if (!nextBlock) {
                nextBlock = builder.getBlock();
            }

            block = nextBlock;

            let offsetX = Math.floor(Math.random() * (grid.getGridDesc().colCount - block.getMaxOffsetX()));
            block.positions.map(p => p.x += offsetX);

            nextBlock = builder.getBlock();
            executeBlockChangeHandlers(nextBlock);

            return block;
        }

        let executeBlockChangeHandlers = function (block) {
            for (let handler of blockChangeHandlerSet) {
                handler && handler(block.positions);
            }
        }

        let createActiveBlock = function () {
            if (activeBlock) {
                disposeActiveBlock();
            }

            activeBlock = getNewBlock();
            if (grid.checkReachBottom(activeBlock.positions)) {
                disposeActiveBlock();
                console.log("You fail.");
            } else {
                grid.activatePositions(activeBlock.positions);
                activeBlockId = setInterval(self.transform.down, interval);
            }
        }

        let disposeActiveBlock = function () {
            clearInterval(activeBlockId);
            activeBlock = null;
            activeBlockId = -1;
        }

        // Public functions
        this.start = function () {
            createActiveBlock();
        }

        this.pause = function () {
            clearInterval(activeBlockId);
        }

        this.stop = function () {
            disposeActiveBlock();
            grid.inactivateAllPositions();
            executeBlockChangeHandlers([]);
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
                } else {
                    reachBottomHandler();
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
                let reachBottom = false;
                if (activeBlock && !(reachBottom = grid.checkReachLeft(activeBlock.positions))
                    && !grid.checkReachRight(activeBlock.positions)
                    && !grid.checkReachBottom(activeBlock.positions)) {
                    let oldPositions = [];
                    activeBlock.positions.map(p => oldPositions.push({ x: p.x, y: p.y }));
                    activeBlock.transform.rotate();
                    grid.inactivatePositions(oldPositions).activatePositions(activeBlock.positions);
                } else if (!activeBlock || reachBottom) {
                    createActiveBlock();
                }
            },
            space: function () {
                let curActiveBlockId = activeBlockId;
                while (curActiveBlockId == activeBlockId) {
                    self.transform.down();
                }
            }
        }
    }

    var singletonEngine = new Engine();
    Reflect.preventExtensions(singletonEngine);

    return singletonEngine;
});