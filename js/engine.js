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
        let self = this,
            interval = 1000;

        let activeBlock = null,
            activeBlockId = -1,
            activeBlockPositions = [],
            nextActiveBlock = null;

        let reachedLeft = false,
            reachedRight = false,
            reachedBottom = false,
            paused = false,
            failed = false;

        let scoreChangedHandlerSet = new Set(),
            blcokChangedHandlerSet = new Set();

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

        let executeScoreChangedHandlers = function (score, totalScore, clearRowCount) {
            for (let handler of scoreChangedHandlerSet) {
                handler && handler(score, totalScore, clearRowCount);
            }
        }

        let executeBlockChangedHandlers = function (positions) {
            for (let handler of blcokChangedHandlerSet) {
                handler && handler(positions);
            }
        }

        let getStartPositions = function (blockPositions) {
            if (!blockPositions || blockPositions.length == 0) {
                throw new Error("The new block was invalid.");
            }

            let newPositions = [];
            let maxX = 0, maxY = 0;
            let sortedPositions1 = blockPositions.sort((p1, p2) => p2.x - p1.x),
                sortedPositions2 = blockPositions.sort((p1, p2) => p2.y - p1.y);

            if (sortedPositions1 && sortedPositions1.length) {
                maxX = sortedPositions1[0].x;
            }
            if (sortedPositions2 && sortedPositions2.length) {
                maxY = sortedPositions2[0].y;
            }

            let offsetX = Math.floor((grid.getGridDesc().colCount - maxX - 1) / 2);
            blockPositions.forEach(p => {
                newPositions.push({
                    x: p.x + offsetX,
                    y: p.y - maxY - 1
                });
            });

            return newPositions;
        }

        let activeBlockPositionsChangedHandler = function (newPositions) {
            if (!newPositions || newPositions.length == 0) {
                throw new Error("The newPositions was invalid.");
            }

            reachedLeft = false;
            reachedRight = false;
            grid.inactivatePositions(activeBlockPositions).activatePositions(newPositions);
            activeBlockPositions = newPositions;

            if (reachedBottom = grid.checkReachBottom(newPositions)) {
                destroyActiveBlock();
                let activeRows = grid.getActiveRows();
                if (activeRows && activeRows.length) {
                    tetris.lastScore = calcScore(activeRows);
                    tetris.totalScore += tetris.lastScore;

                    grid.highlightRows(activeRows);
                    setTimeout(() => {
                        grid.unhighlightRows(activeRows).inactivateRows(activeRows).repaint();
                        buildActiveBlock();
                        executeScoreChangedHandlers(tetris.lastScore, tetris.totalScore, activeRows.length);
                    }, 300);
                } else {
                    buildActiveBlock();
                }
            } else {
                reachedLeft = grid.checkReachLeft(newPositions);
                reachedRight = grid.checkReachRight(newPositions);
            }
        }

        let buildActiveBlock = function () {
            if (!nextActiveBlock) {
                nextActiveBlock = builder.getBlock();
            }

            activeBlock = nextActiveBlock;
            activeBlockPositions = getStartPositions(activeBlock.getPositions());
            activeBlock.initializeStartPositions(activeBlockPositions);
            activeBlock.addPositionsChangedHandler(activeBlockPositionsChangedHandler);

            nextActiveBlock = builder.getBlock();
            executeBlockChangedHandlers(nextActiveBlock.getPositions());

            if (reachedBottom = grid.checkReachBottom(activeBlockPositions)) {
                destroyActiveBlock();
                failed = true;
                console.log("You failed.");
            } else {
                activeBlockId = setInterval(self.transition.down, interval);
            }
        }

        let destroyActiveBlock = function () {
            clearInterval(activeBlockId);
            activeBlockId = -1;
            activeBlock = null;
        }

        // Public functions
        this.start = function () {
            if (activeBlock) {
                grid.inactivatePositions(activeBlockPositions);
                destroyActiveBlock();
            }

            failed = false;
            buildActiveBlock();
        }

        this.pause = function () {
            paused = !paused;

            if (activeBlockId > 0) {
                clearInterval(activeBlockId);
                activeBlockId = -1;
            } else if (activeBlock) {
                self.transition.down();
                activeBlockId = setInterval(self.transition.down, interval);
            } else {
                buildActiveBlock();
            }
        }

        this.stop = function () {
            destroyActiveBlock();
            grid.inactivateAllPositions();
            executeScoreChangedHandlers(0, 0, 0);
            executeBlockChangedHandlers([]);
        }

        this.addScoreChangedHandler = function (handler) {
            handler && scoreChangedHandlerSet.add(handler);
        }

        this.addBlockChangedHandler = function (handler) {
            handler && blcokChangedHandlerSet.add(handler);
        }

        this.transition = {
            down: function () {
                if (paused) { self.pause(); }

                if (activeBlock && !reachedBottom) {
                    activeBlock.transition.down();
                }
            },
            left: function () {
                if (paused) { self.pause(); }

                if (activeBlock && !reachedLeft) {
                    activeBlock.transition.left();
                }
            },
            right: function () {
                if (paused) { self.pause(); }

                if (activeBlock && !reachedRight) {
                    activeBlock.transition.right();
                }
            },
            rotate: function () {
                if (paused) { self.pause(); }

                if (activeBlock && grid.checkPositionsWithinGrid(activeBlockPositions) && !reachedBottom) {
                    activeBlock.transition.rotate();
                }
            },
            space: function () {
                if (paused) { self.pause(); }

                let curActiveBlockId = activeBlockId;
                while (curActiveBlockId == activeBlockId) {
                    self.transition.down();
                }
            }
        }
    }

    let singletonEngine = new Engine();
    Reflect.preventExtensions(singletonEngine);

    return singletonEngine;
});