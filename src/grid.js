import "babel-polyfill";
import { gridConfig } from "./var/constants";
import { gridDOM } from "./var/doms";

const _activeClassName = "active",
    _highlightClassName = "highlight",
    _gridBoundary = {
        x1: 0, x2: 0,
        y1: 0, y2: 0,
    };

const _getElements = function (y, x) {
    if (y >= 0 && x >= 0) {
        return gridDOM.find(`.g-y${y}-x${x}`);
    }

    if (y >= 0) {
        return gridDOM.find(`.g-y${y} .g-col`);
    }

    return [];
}

const _getActiveElements = function (y) {
    if (y >= 0) {
        return gridDOM.find(`.g-y${y} .active`);
    }

    return [];
}

const _addClass = function (className, y, x = -1) {
    let elments = _getElements(y, x);
    if (elments.length) {
        elments.addClass(className);
    }
}

const _removeClass = function (classname, y, x = -1) {
    let elments = _getElements(y, x);
    if (elments.length) {
        elments.removeClass(classname);
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
    }

    activateCoordinates(coordinates) {
        coordinates.forEach(co => _addClass(_activeClassName, co.y, co.x));
        return this;
    }

    inactivateCoordinates(coordinates) {
        coordinates.forEach(co => _removeClass(_activeClassName, co.y, co.x));
        return this;
    }

    inactivateRows(rows) {
        rows.forEach(y => _removeClass(_activeClassName, y));
        return this;
    }

    inactivateAll() {
        for (let y = _gridBoundary.y1; y <= _gridBoundary.y2; y++) {
            _removeClass(_activeClassName, y);
        }
        return this;
    }

    highlightRows(rows) {
        rows.forEach(y => _addClass(_highlightClassName, y));
        return this;
    }

    unhighlightRows(rows) {
        rows.forEach(y => _removeClass(_highlightClassName, y));
        return this;
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
                    _addClass(_activeClassName, maxInactiveY, $(el).data("x"));
                    _removeClass(_activeClassName, y, $(el).data("x"));
                });
                maxInactiveY--;
            }
            y--;
        }

        return this;
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
}

const singletonGrid = new Grid(gridDOM, gridConfig.rowCount, gridConfig.colCount);
export default singletonGrid;