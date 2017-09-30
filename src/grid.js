import "babel-polyfill";
import { gridConfig } from "./var/constants";
import { gridDOM } from "./var/doms";

class Grid {
    constructor() {
        gridDOM.html("");
        for (let y = 0; y < gridConfig.rowCount; y++) {
            let rHtml = [`<div data-y='${y}' class='g-row g-y${y}'>`];
            for (let x = 0; x < gridConfig.colCount; x++) {
                rHtml.push(`<span data-x='${x}' class='g-col g-y${y}-x${x}'></span>`);
            }
            rHtml.push("</div>");
            gridDOM.append(rHtml.join(""));
        }

        this.gridBoundary = {
            x1: 0, x2: gridConfig.colCount - 1,
            y1: 0, y2: gridConfig.rowCount - 1,
        };

        this.updateBlockState = this.updateBlockState.bind(this);
        this.refresh = this.refresh.bind(this);
        this.clear = this.clear.bind(this);
    }

    updateCoordinateState(coordinate = { x, y }, active = false) {
        let { x, y } = coordinate, elements = [];

        if (y >= 0 && x >= 0) {
            elements = gridDOM.find(`.g-y${y}-x${x}`);
        } else if (y >= 0 && !x) {
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

    updateRowHighlightState(y = -1, highlighted = false) {
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

    repaint() {
        let y = this.gridBoundary.y2,
            maxInactiveY = -1;

        while (y >= 0) {
            let elements = this.getActiveElements(y);
            if (elements.length == 0) {
                if (maxInactiveY < 0) {
                    maxInactiveY = y;
                }
            } else if (maxInactiveY >= 0) {
                elements.map((index, el) => {
                    let x = $(el).data("x");
                    this.updateCoordinateState({ y: maxInactiveY, x }, true);
                    this.updateCoordinateState({ y, x });
                });
                maxInactiveY--;
            }
            y--;
        }
    }

    isActive(coordinate = { x: -1, y: -1 }) {
        let { x, y } = coordinate;
        if (y >= 0 && x >= 0) {
            return gridDOM.find(`.g-y${coordinate.y}-x${coordinate.x}.active`).length > 0;
        }
        return false;
    }

    getActiveElements(y = -1) {
        if (y >= 0) {
            return gridDOM.find(`.g-y${y} .active`);
        }
        return [];
    }

    getActiveRows() {
        let activeRows = [];
        for (let y = this.gridBoundary.y1; y <= this.gridBoundary.y2; y++) {
            if (this.getActiveElements(y).length == (this.gridBoundary.x2 + 1)) {
                activeRows.push(y);
            }
        }
        return activeRows;
    }

    hasCoordinate(coordinateCollection = [], coordinate = { x: -1, y: -1 }) {
        let co = coordinateCollection.filter(co => co.x == coordinate.x && co.y == coordinate.y);
        return co && co.length;
    }

    checkReachBottom(coordinates) {
        for (let co of coordinates) {
            if (co.y >= this.gridBoundary.y2) {
                return true;
            }

            let newCo = { x: co.x, y: co.y + 1 };
            if (!this.hasCoordinate(coordinates, newCo) && this.isActive(newCo)) {
                return true;
            }
        }
        return false;
    }

    checkReachLeft(coordinates) {
        for (let co of coordinates) {
            if (co.x <= this.gridBoundary.x1) {
                return true;
            }

            let newCo = { x: co.x - 1, y: co.y };
            if (!this.hasCoordinate(coordinates, newCo) && this.isActive(newCo)) {
                return true;
            }
        }
        return false;
    }

    checkReachRight(coordinates) {
        for (let co of coordinates) {
            if (co.x >= this.gridBoundary.x2) {
                return true;
            }

            let newCo = { x: co.x + 1, y: co.y };
            if (!this.hasCoordinate(coordinates, newCo) && this.isActive(newCo)) {
                return true;
            }
        }
        return false;
    }

    updateBlockState(newCoordinates, oldCoordinates) {
        let reachedBottom = false, reachedLeft = false, reachedRight = false, activeRows = [];

        if (oldCoordinates && oldCoordinates.length) {
            oldCoordinates.forEach(co => this.updateCoordinateState(co));
        }
        if (newCoordinates && newCoordinates.length) {
            newCoordinates.forEach(co => this.updateCoordinateState(co, true));

            reachedBottom = this.checkReachBottom(newCoordinates);
            if (reachedBottom) {
                activeRows = this.getActiveRows();
            } else {
                reachedLeft = this.checkReachLeft(newCoordinates);
                reachedRight = this.checkReachRight(newCoordinates);
            }
        }

        if (activeRows && activeRows.length > 0) {
            activeRows.forEach(y => this.updateRowHighlightState(y, true));
        }

        return { reachedBottom, reachedLeft, reachedRight, activeRows, };
    }

    refresh() {
        let activeRows = this.getActiveRows();
        activeRows.forEach(y => {
            this.updateRowHighlightState(y);
            this.updateCoordinateState({ y });
        });
        this.repaint();
    }

    clear() {
        for (let y = this.gridBoundary.y1; y <= this.gridBoundary.y2; y++) {
            this.updateCoordinateState({ y });
        }
    }
}

const singletonGrid = new Grid();
export default singletonGrid;