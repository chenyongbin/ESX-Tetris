import "babel-polyfill";
import * as util from "./util";
import { getBlock } from "./blockBuilder";

class Engine {

    constructor() {
        // properties related to global configuration
        this.transitionInterval = 1000;
        this.highlightTimeout = 300;
        this.failed = false;
        this.paused = false;

        // properties related to block
        this.activeBlock = null;
        this.activeBlockId = -1;
        this.activeBlockCoordinates = [];
        this.nextActiveBlock = null;

        // properties related to announcement panel
        this.currentScore = 0;
        this.totalScore = 0;
        this.clearRowCount = 0;
        this.scoreChangedHandlerSet = new Set();
        this.blockChangedHandlerSet = new Set();

        // properties related to view
        this.updateBlockStateFunc = null;
        this.refreshViewFunc = null;
        this.clearViewFunc = null;
        this.viewConfig = { width: 0, height: 0 };
        this.updateBlockStateResult = { reachedBottom: false, reachedLeft: false, reachedRight: false, activeRows: [] };

        // set exposed function's action scope of this
        this.blockCoordinatesChangedHandler = this.blockCoordinatesChangedHandler.bind(this);
        this.transition_down = this.transition_down.bind(this);
        this.transition_left = this.transition_left.bind(this);
        this.transition_right = this.transition_right.bind(this);
        this.transition_rotate = this.transition_rotate.bind(this);
        this.transition_space = this.transition_space.bind(this);
        this.start = this.start.bind(this);
        this.pause = this.pause.bind(this);
        this.stop = this.stop.bind(this);
    }

    onScoreChanged(currentScore, totalScore, clearRowCount) {
        for (let handler of this.scoreChangedHandlerSet) {
            handler && handler(currentScore, totalScore, clearRowCount);
        }
    }

    onBlockChanged(coordinates) {
        for (let handler of this.blockChangedHandlerSet) {
            handler && handler(coordinates);
        }
    }

    calculateScore(rows) {
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
                score += util.getFibValue(calcCount) * 10;
            }
        });

        if (calcCount > 0) {
            score += util.getFibValue(calcCount) * 10;
        }

        return score;
    }

    getStartOffsets(coordinates) {
        let maxX = 0, maxY = 0;
        let sortedCoordinates1 = coordinates.sort((co1, co2) => co2.x - co1.x),
            sortedCoordinates2 = coordinates.sort((co1, co2) => co2.y - co1.y);

        if (sortedCoordinates1 && sortedCoordinates1.length) {
            maxX = sortedCoordinates1[0].x;
        }
        if (sortedCoordinates2 && sortedCoordinates2.length) {
            maxY = sortedCoordinates2[0].y;
        }

        let offsetX = Math.floor((this.viewConfig.width - maxX - 1) / 2);

        return [offsetX, -(maxY + 1)];
    }

    blockCoordinatesChangedHandler(newCoordinates) {
        this.updateBlockStateResult = this.updateBlockStateFunc(newCoordinates, this.activeBlockCoordinates);
        this.activeBlockCoordinates = [...newCoordinates];

        if (this.updateBlockStateResult.reachedBottom) {
            this.destroyActiveBlock();
            if (this.updateBlockStateResult.activeRows && this.updateBlockStateResult.activeRows.length) {
                this.clearRowCount = this.updateBlockStateResult.activeRows.length;
                this.currentScore = this.calculateScore(this.updateBlockStateResult.activeRows);
                this.totalScore += this.currentScore;

                setTimeout(() => {
                    this.refreshViewFunc();
                    this.buildActiveBlock();
                    this.onScoreChanged(this.currentScore, this.totalScore, this.clearRowCount);
                }, this.highlightTimeout);
            } else {
                this.buildActiveBlock();
            }
        }
    }

    buildActiveBlock() {
        if (!this.nextActiveBlock) {
            this.nextActiveBlock = getBlock();
        }

        this.activeBlock = this.nextActiveBlock;
        let [offsetX, offsetY] = this.getStartOffsets(this.activeBlock.getCoordinates());
        this.activeBlock.adjustCoordinates(offsetX, offsetY);
        this.activeBlockCoordinates = this.activeBlock.getCoordinates();
        this.activeBlock.addCoordinatesChangedHandler(this.blockCoordinatesChangedHandler);

        this.nextActiveBlock = getBlock();
        this.onBlockChanged(this.nextActiveBlock.getCoordinates());

        this.updateBlockStateResult = this.updateBlockStateFunc(this.activeBlockCoordinates, null);
        if (this.updateBlockStateResult.reachedBottom) {
            this.destroyActiveBlock();
            this.failed = true;
            console.log("You failed.");
        } else {
            this.activeBlockId = setInterval(() => {
                this.activeBlock.transition_down();
            }, this.transitionInterval);
        }
    }

    destroyActiveBlock() {
        clearInterval(this.activeBlockId);
        this.activeBlockId = -1;
        this.activeBlock = null;
    }

    cleanup() {
        this.destroyActiveBlock();
        this.clearViewFunc();
        this.onScoreChanged(0, 0, 0);
        this.onBlockChanged([]);
    }

    start() {
        if (this.failed) {
            this.cleanup();
        }

        if (this.activeBlock) {
            this.updateBlockStateResult = this.updateBlockStateFunc(null, this.activeBlockCoordinates);
            this.destroyActiveBlock();
        }

        this.failed = false;
        this.buildActiveBlock();
    }

    pause() {
        if (this.failed) return false;

        this.paused = !this.paused;

        if (this.activeBlockId > 0) {
            clearInterval(this.activeBlockId);
            this.activeBlockId = -1;
        } else if (this.activeBlock) {
            this.activeBlock.transition_down();
            this.activeBlockId = setInterval(() => {
                this.activeBlock.transition_down();
            }, this.transitionInterval);
        } else {
            this.buildActiveBlock();
        }
    }

    stop() {
        this.cleanup();
    }

    transition_left() {
        if (this.paused) { this.pause(); }

        if (!this.updateBlockStateResult.reachedLeft) {
            this.activeBlock.transition_left();
        }
    }

    transition_right() {
        if (this.paused) { this.pause(); }

        if (!this.updateBlockStateResult.reachedRight) {
            this.activeBlock.transition_right();
        }
    }

    transition_down() {
        if (this.paused) { this.pause(); }

        if (!this.updateBlockStateResult.reachedBottom) {
            this.activeBlock.transition_down();
        }
    }

    transition_rotate() {
        if (this.paused) { this.pause(); }

        if (!this.updateBlockStateResult.reachedBottom && !this.updateBlockStateResult.reachedLeft && !this.updateBlockStateResult.reachedRight) {
            this.activeBlock.transition_rotate();
        }
    }

    transition_space() {
        if (this.paused) { this.pause(); }

        let curActiveBlockId = this.activeBlockId;
        while (curActiveBlockId == this.activeBlockId) {
            this.activeBlock.transition_down();
        }
    }

    addScoreChangedHandler(handler) {
        this.scoreChangedHandlerSet.add(handler);
    }

    addBlockChangedHandler(handler) {
        this.blockChangedHandlerSet.add(handler);
    }

    addUpdateBlockStateFunc(updateBlockStateFunc) {
        this.updateBlockStateFunc = updateBlockStateFunc;        
    }

    addRefreshViewFunc(refreshViewFunc) {
        this.refreshViewFunc = refreshViewFunc;        
    }

    addClearViewFunc(clearViewFunc) {
        this.clearViewFunc = clearViewFunc;        
    }

    addViewConfig(width, height) {
        this.viewConfig.width = width;
        this.viewConfig.height = height;
    }
}

const singletonEngine = new Engine();
export default singletonEngine;