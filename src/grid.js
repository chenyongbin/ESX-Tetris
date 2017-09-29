import "babel-polyfill";
import { gridConfig } from "./var/constants";
import { gridDOM } from "./var/doms";

const _gridBoundary = {
    x1: 0, x2: 0,
    y1: 0, y2: 0,
};

const _getActiveElements = function (y) {
    if (y >= 0) {
        return gridDOM.find(`.g-y${y} .active`);
    }

    return [];
}

const _setActiveState = function (coordinate = { x: -1, y: -1 }, active = false) {
    let { x, y } = coordinate, elements = [];

    if (y >= 0 && x >= 0) {
        elements = gridDOM.find(`.g-y${y}-x${x}`);
    } else if (y >= 0) {
        elements = gridDOM.find(`.g-y${y} .g-col`);
    }

    if (elements && elements.length > 0) {
        if (active) {
            elements.addClass("active");
        } else {
            elements.removeClass("active");
        }
    }
}

const _setHighlightedState = function (y = -1, highlighted = false) {
    let elements = [];

    if (y >= 0) {
        elements = gridDOM.find(`.g-y${y} .g-col`);
    }

    if (elements && elements.length > 0) {
        if (highlighted) {
            elements.addClass("highlight");
        } else {
            elements.removeClass("highlight");
        }
    }
}

const _hasCoordinate = function (coordinateCollection, coordinate) {
    let co = coordinateCollection.filter(co => co.x == coordinate.x && co.y == coordinate.y);
    return co && co.length;
}

const _isActive = function (coordinate) {
    return gridDOM.find(`.g-y${coordinate.y}-x${coordinate.x}.active`).length > 0;
}

class Grid {
    constructor(gridDOM, rowCount, colCount) {
        gridDOM.html("");
        for (let y = 0; y < rowCount; y++) {
            let rHtml = [`<div data-y='${y}' class='g-row g-y${y}'>`];
            for (let x = 0; x < colCount; x++) {
                rHtml.push(`<span data-x='${x}' class='g-col g-y${y}-x${x}'></span>`);
            }
            rHtml.push("</div>");
            gridDOM.append(rHtml.join(""));
        }

        _gridBoundary.y2 = rowCount - 1;
        _gridBoundary.x2 = colCount - 1;

        this.updateCoordinates = this.updateCoordinates.bind(this);
        this.refresh = this.refresh.bind(this);
        this.clear = this.clear.bind(this);
    }

    repaint() {
        let y = _gridBoundary.y2,
            maxInactiveY = -1;

        while (y >= 0) {
            let elements = _getActiveElements(y);
            if (elements.length == 0) {
                if (maxInactiveY < 0) {
                    maxInactiveY = y;
                }
            } else if (maxInactiveY >= 0) {
                elements.map((index, el) => {
                    let x = $(el).data("x");
                    _setActiveState({ y: maxInactiveY, x }, true);
                    _setActiveState({ y, x });
                });
                maxInactiveY--;
            }
            y--;
        }

        // return this;
    }

    getActiveRows() {
        let activeRows = [];
        for (let y = _gridBoundary.y1; y <= _gridBoundary.y2; y++) {
            if (_getActiveElements(y).length == gridConfig.colCount) {
                activeRows.push(y);
            }
        }
        return activeRows;
    }

    checkReachBottom(coordinates) {
        for (let co of coordinates) {
            if (co.y >= _gridBoundary.y2) {
                return true;
            }

            let newCo = { x: co.x, y: co.y + 1 };
            if (!_hasCoordinate(coordinates, newCo) && _isActive(newCo)) {
                return true;
            }
        }
        return false;
    }

    checkReachLeft(coordinates) {
        for (let co of coordinates) {
            if (co.x <= _gridBoundary.x1) {
                return true;
            }

            let newCo = { x: co.x - 1, y: co.y };
            if (!_hasCoordinate(coordinates, newCo) && _isActive(newCo)) {
                return true;
            }
        }
        return false;
    }

    checkReachRight(coordinates) {
        for (let co of coordinates) {
            if (co.x >= _gridBoundary.x2) {
                return true;
            }

            let newCo = { x: co.x + 1, y: co.y };
            if (!_hasCoordinate(coordinates, newCo) && _isActive(newCo)) {
                return true;
            }
        }
        return false;
    }

    updateCoordinates(newCoordinates, oldCoordinates) {
        let reachedBottom = false, reachedLeft = false, reachedRight = false, activeRows = [];

        if (oldCoordinates && oldCoordinates.length) {
            oldCoordinates.forEach(co => _setActiveState(co));
        }
        if (newCoordinates && newCoordinates.length) {
            newCoordinates.forEach(co => _setActiveState(co, true));

            reachedBottom = this.checkReachBottom(newCoordinates);
            if (reachedBottom) {
                activeRows = this.getActiveRows();
            } else {
                reachedLeft = this.checkReachLeft(newCoordinates);
                reachedRight = this.checkReachRight(newCoordinates);
            }
        }

        if (activeRows && activeRows.length > 0) {
            activeRows.forEach(y => _setHighlightedState(y, true));
        }

        return { reachedBottom, reachedLeft, reachedRight, activeRows, };
    }

    refresh() {
        let activeRows = this.getActiveRows();
        activeRows.forEach(y => {
            _setHighlightedState(y);
            _setActiveState({ y });
        });
        this.repaint();
    }

    clear() {
        for (let y = _gridBoundary.y1; y <= _gridBoundary.y2; y++) {
            _setActiveState({ y });
        }
    }
}

const singletonGrid = new Grid(gridDOM, gridConfig.rowCount, gridConfig.colCount);
export default singletonGrid;