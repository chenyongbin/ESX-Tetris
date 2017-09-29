import "babel-polyfill";
import * as util from "./util";
import { getBlock } from "./blockBuilder";

let _transitionInterval = 1000,
    _highlightTimeout = 300,
    _lastScore = 0,
    _totalScore = 0,
    _clearRowCount = 0,

    _failed = false,
    _paused = false,

    _activeBlock = null,
    _activeBlockId = -1,
    _activeBlockCoordinates = [],
    _nextActiveBlock = null,

    _scoreChangedHandlerSet = new Set(),
    _blockChangedHandlerSet = new Set(),

    _updateCoordinatesFunc = null,
    _refreshViewFunc = null,
    _clearViewFunc = null;

let _viewConfig = { width: 0, height: 0 };
let _updateResult = {
    reachedBottom: false,
    reachedLeft: false,
    reachedRight: false,
    activeRows: []
};

const _onScoreChanged = function (lastScore, totalScore, clearRowCount) {
    for (let handler of _scoreChangedHandlerSet) {
        handler && handler(lastScore, totalScore, clearRowCount);
    }
}
const _onBlockChanged = function (coordinates) {
    for (let handler of _blockChangedHandlerSet) {
        handler && handler(coordinates);
    }
}

const _calculateScore = function (rows) {
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

const _getStartOffsets = function (coordinates) {
    let maxX = 0, maxY = 0;
    let sortedCoordinates1 = coordinates.sort((co1, co2) => co2.x - co1.x),
        sortedCoordinates2 = coordinates.sort((co1, co2) => co2.y - co1.y);

    if (sortedCoordinates1 && sortedCoordinates1.length) {
        maxX = sortedCoordinates1[0].x;
    }
    if (sortedCoordinates2 && sortedCoordinates2.length) {
        maxY = sortedCoordinates2[0].y;
    }

    let offsetX = Math.floor((_viewConfig.width - maxX - 1) / 2);

    return [offsetX, -(maxY + 1)];
}

const _blockCoordinatesChangedHandler = function (newCoordinates) {
    _updateResult = _updateCoordinatesFunc(newCoordinates, _activeBlockCoordinates);
    _activeBlockCoordinates = [...newCoordinates];

    if (_updateResult.reachedBottom) {
        _destroyActiveBlock();
        if (_updateResult.activeRows && _updateResult.activeRows.length) {
            _clearRowCount = _updateResult.activeRows.length;
            _lastScore = _calculateScore(_updateResult.activeRows);
            _totalScore += _lastScore;

            setTimeout(() => {
                _refreshViewFunc();
                _buildActiveBlock();
                _onScoreChanged(_lastScore, _totalScore, _clearRowCount);
            }, _highlightTimeout);
        } else {
            _buildActiveBlock();
        }
    }
}

const _buildActiveBlock = function () {
    if (!_nextActiveBlock) {
        _nextActiveBlock = getBlock();
    }

    _activeBlock = _nextActiveBlock;
    let [offsetX, offsetY] = _getStartOffsets(_activeBlock.getCoordinates());
    _activeBlock.adjustCoordinates(offsetX, offsetY);
    _activeBlockCoordinates = _activeBlock.getCoordinates();
    _activeBlock.addCoordinatesChangedHandler(_blockCoordinatesChangedHandler);

    _nextActiveBlock = getBlock();
    _onBlockChanged(_nextActiveBlock.getCoordinates());

    _updateResult = _updateCoordinatesFunc(_activeBlockCoordinates, null);
    if (_updateResult.reachedBottom) {
        _destroyActiveBlock();
        _failed = true;
        console.log("You failed.");
    } else {
        _activeBlockId = setInterval(() => {
            _activeBlock.transition_down();
        }, _transitionInterval);
    }
}

const _destroyActiveBlock = function () {
    clearInterval(_activeBlockId);
    _activeBlockId = -1;
    _activeBlock = null;
}

const _cleanup = function () {
    _destroyActiveBlock();
    _clearViewFunc();
    _onScoreChanged(0, 0, 0);
    _onBlockChanged([]);
}

class Engine {
    start() {
        if (_failed) {
            _cleanup();
        }

        if (_activeBlock) {
            _updateResult = _updateCoordinatesFunc(null, _activeBlockCoordinates);
            _destroyActiveBlock();
        }

        _failed = false;
        _buildActiveBlock();
    }

    pause() {
        if (_failed) return false;

        _paused = !_paused;

        if (_activeBlockId > 0) {
            clearInterval(_activeBlockId);
            _activeBlockId = -1;
        } else if (_activeBlock) {
            _activeBlock.transition_down();
            _activeBlockId = setInterval(() => {
                _activeBlock.transition_down();
            }, _transitionInterval);
        } else {
            _buildActiveBlock();
        }
    }

    stop() {
        _cleanup();
    }

    transition_left() {
        if (_paused) { this.pause(); }

        if (!_updateResult.reachedLeft) {
            _activeBlock.transition_left();
        }
    }

    transition_right() {
        if (_paused) { this.pause(); }

        if (!_updateResult.reachedRight) {
            _activeBlock.transition_right();
        }
    }

    transition_down() {
        if (_paused) { this.pause(); }

        if (!_updateResult.reachedBottom) {
            _activeBlock.transition_down();
        }
    }

    transition_rotate() {
        if (_paused) { this.pause(); }

        if (!_updateResult.reachedBottom && !_updateResult.reachedLeft && !_updateResult.reachedRight) {
            _activeBlock.transition_rotate();
        }
    }

    transition_space() {
        if (_paused) { this.pause(); }

        let curActiveBlockId = _activeBlockId;
        while (curActiveBlockId == _activeBlockId) {
            _activeBlock.transition_down();
        }
    }

    addScoreChangedHandler(handler) {
        _scoreChangedHandlerSet.add(handler);
    }

    addBlockChangedHandler(handler) {
        _blockChangedHandlerSet.add(handler);
    }

    addUpdateCoordinatesFunc(updateCoordinatesFunc) {
        _updateCoordinatesFunc = updateCoordinatesFunc;
    }

    addRefreshViewFunc(refreshViewFunc) {
        _refreshViewFunc = refreshViewFunc;
    }

    addClearViewFunc(clearViewFunc) {
        _clearViewFunc = clearViewFunc;
    }

    addViewConfig(width, height) {
        _viewConfig = { width: width, height: height };
    }
}

const singletonEngine = new Engine();
export default singletonEngine;