import "babel-polyfill";
import "../lib/jquery";
import { gridDOM } from "./var/doms";
import { gridConfig } from "./var/constants";

function Grid() {
    if (!(this instanceof Grid)) {
        return new Grid();
    }

    // Private variables
    let self = this;
    let gridData = [];
    let gridBoundary = {
        x1: 0, x2: 0,
        y1: 0, y2: 0
    };

    // Private methods
    let init = function () {
        for (let r = 0; r < gridConfig.rowCount; r++) {
            let rData = [];
            let rHtml = ["<div class='g-row'>"];
            for (let c = 0; c < gridConfig.colCount; c++) {
                rData.push({ active: false });
                rHtml.push("<span class='g-col'></span>");
            }
            rHtml.push("</div>");
            gridData.push(rData);
            gridDOM.append(rHtml.join(""));
        }

        gridBoundary.y2 = gridData.length - 1;
        gridBoundary.x2 = gridData[0].length - 1;
    }

    let activate = function (y, x = -1) {
        if (y >= gridBoundary.y1 && y <= gridBoundary.y2) {
            if (x >= gridBoundary.x1 && x <= gridBoundary.x2) {
                gridDOM.find(".g-row:eq(" + y + ")>.g-col:eq(" + x + ")").addClass("active");
                gridData[y][x].active = true;
            } else {
                gridDOM.find(".g-row:eq(" + y + ")>.g-col").addClass("active");
                gridData[y].map(col => col.active = true);
            }
        }
    }

    let inactivate = function (y, x = -1) {
        if (y >= gridBoundary.y1 && y <= gridBoundary.y2) {
            if (x >= gridBoundary.x1 && x <= gridBoundary.x2) {
                gridDOM.find(".g-row:eq(" + y + ")>.g-col:eq(" + x + ")").removeClass("active");
                gridData[y][x].active = false;
            } else {
                gridDOM.find(".g-row:eq(" + y + ")>.g-col").removeClass("active");
                gridData[y].map(col => col.active = false);
            }
        }
    }

    let hasPosition = function (positionCollection, position) {
        if (!positionCollection || positionCollection.length == 0) {
            return false;
        }

        let p = positionCollection.filter(p => p.x == position.x && p.y == position.y);
        return p && p.length;
    }

    // Public functions
    this.activatePositions = function (positions) {
        if (!positions || positions.length == 0) {
            throw new Error("The positions was invalid.");
        }

        positions.map(p => activate(p.y, p.x));

        return self;
    }

    this.inactivatePositions = function (positions) {
        if (!positions || positions.length == 0) {
            throw new Error("The positions was invalid.");
        }

        positions.map(p => inactivate(p.y, p.x));

        return self;
    }

    this.inactivateAllPositions = function () {
        gridData.map((row, y) => inactivate(y));
    }

    this.highlightRows = function (rows) {
        if (!rows || rows.length == 0) {
            throw new Error("The rows was invalid.");
        }

        rows.forEach(y => gridDOM.find(".g-row:eq(" + y + ")").addClass("highlight"));

        return self;
    }

    this.unhighlightRows = function (rows) {
        if (!rows || rows.length == 0) {
            throw new Error("The rows was invalid.");
        }

        rows.forEach(y => gridDOM.find(".g-row:eq(" + y + ")").removeClass("highlight"));

        return self;
    }

    this.inactivateRows = function (rows) {
        if (!rows || rows.length == 0) {
            throw new Error("The rows was invalid.");
        }

        rows.map(y => inactivate(y));

        return self;
    }

    this.getActiveRows = function () {
        let rows = [];
        gridData.forEach((row, y) => {
            if (row.filter(col => col.active == false).length == 0) {
                rows.push(y);
            }
        });
        return rows;
    }

    this.repaint = function () {
        let y = gridData.length - 1;

        let inactiveRowCount = 0,
            maxActiveRowIndex = -1;
        while (y >= 0) {
            if (gridData[y].filter(col => col.active == true).length == 0) {
                maxActiveRowIndex = maxActiveRowIndex < 0 ? y : maxActiveRowIndex;
            } else if (maxActiveRowIndex >= 0) {
                gridData[y].map((col, x) => {
                    if (col.active) {
                        activate(maxActiveRowIndex, x);
                    }
                    inactivate(y, x);
                });
                maxActiveRowIndex--;
            }

            y--;
        }

        return self;
    }

    this.isActive = function (position) {
        if (!position) {
            throw new Error("The position was invalid.");
        }

        if ((position.x >= gridBoundary.x1 && position.x <= gridBoundary.x2)
            && (position.y >= gridBoundary.y1 && position.y <= gridBoundary.y2)) {
            return gridData[position.y][position.x].active;
        } else {
            return false;
            //throw new Error("The position:(" + position.x + "," + position.y + ") is beyond the boundary.");
        }
    }

    this.checkPositionsWithinGrid = function (positions) {
        if (!positions || positions.length == 0) {
            throw new Error("The positions was invalid.");
        }

        let withinGrid = true;
        for (let p of positions) {
            if ((p.x < gridBoundary.x1 || p.x > gridBoundary.x2)
                || (p.y < gridBoundary.y1 || p.y > gridBoundary.y2)) {
                withinGrid = false;
                break;
            }
        }
        return withinGrid;
    }

    this.checkReachBottom = function (positions) {
        if (!positions || positions.length == 0) {
            throw new Error("The positions was invalid.");
        }

        let reachBottom = false;
        for (let p of positions) {
            if (p.y >= gridBoundary.y2) {
                reachBottom = true;
                break;
            }

            let newPosition = { x: p.x, y: p.y + 1 };
            if (!hasPosition(positions, newPosition) && self.isActive(newPosition)) {
                reachBottom = true;
                break;
            }
        }

        return reachBottom;
    }

    this.checkReachLeft = function (positions) {
        if (!positions || positions.length == 0) {
            throw new Error("The positions was invalid.");
        }

        let reachLeft = false;
        for (let p of positions) {
            if (p.x <= gridBoundary.x1) {
                reachLeft = true;
                break;
            }

            let newPosition = { x: p.x - 1, y: p.y };
            if (!hasPosition(positions, newPosition) && self.isActive(newPosition)) {
                reachLeft = true;
                break;
            }
        }

        return reachLeft;
    }

    this.checkReachRight = function (positions) {
        if (!positions || positions.length == 0) {
            throw new Error("The positions was invalid.");
        }

        let reachRight = false;
        for (let p of positions) {
            if (p.x >= gridBoundary.x2) {
                reachRight = true;
                break;
            }

            let newPosition = { x: p.x + 1, y: p.y };
            if (!hasPosition(positions, newPosition) && self.isActive(newPosition)) {
                reachRight = true;
                break;
            }
        }

        return reachRight;
    }

    this.getGridDesc = function () {
        return {
            colCount: gridConfig.colCount,
            rowCount: gridConfig.rowCount
        };
    }

    init();
}

const singletonGrid = new Grid();
export default singletonGrid;