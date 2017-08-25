/* 网格组件
 * 1) 返回网格html和方块坐标集合
 * 2) 激活/失活points
 * 3) 高亮化/正常化行
 * 4) 失活行
 * 5) 重绘整个网格
 * 6) 判断某个point是否已激活
 * 7) 检查是否到底
 */

define([
    "../js/var/gridDOM.js",
    "../js/var/gridConfig.js",
    "../js/var/tetris.js",
    "../js/common.js",
    "../js/lib/jquery.js"
], function (gridDOM, gridConfig, tetris, comm) {
    'use strict';

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

        let queryPosition = function (x, y) {
            return gridDOM.find(".g-row:eq(" + y + ")>.g-col:eq(" + x + ")");
        }

        let queryRowPositions = function (y) {
            return gridDOM.find(".g-row:eq(" + y + ")>.g-col");
        }

        let queryRow = function (y) {
            return gridDOM.find(".g-row:eq(" + y + ")");
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

            positions.forEach(p => {
                queryPosition(p.x, p.y).addClass("active");
                gridData[p.y][p.x].active = true;
            });

            return self;
        }

        this.inactivatePositions = function (positions) {
            if (!positions || positions.length == 0) {
                throw new Error("The positions was invalid.");
            }

            positions.forEach(p => {
                queryPosition(p.x, p.y).removeClass("active");
                gridData[p.y][p.x].active = false;
            });

            return self;
        }

        this.inactivateAllPositions = function () {
            gridData.forEach((row, y) => {
                row.map(col => col.active = false);
                queryRowPositions(y).removeClass("active");
            });
        }

        this.highlightRows = function (rows) {
            if (!rows || rows.length == 0) {
                throw new Error("The rows was invalid.");
            }

            rows.forEach(y => queryRow(y).addClass("highlight"));

            return self;
        }

        this.unhighlightRows = function (rows) {
            if (!rows || rows.length == 0) {
                throw new Error("The rows was invalid.");
            }

            rows.forEach(y => queryRow(y).removeClass("highlight"));

            return self;
        }

        this.inactivateRows = function (rows) {
            if (!rows || rows.length == 0) {
                throw new Error("The rows was invalid.");
            }

            rows.forEach(y => {
                queryRowPositions(y).removeClass("active");
                gridData[y].map(p => p.active = false);
            });

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
                            gridData[maxActiveRowIndex][x].active = true;
                            queryPosition(x, maxActiveRowIndex).addClass("active");
                        }
                        col.active = false;
                        queryPosition(x, y).removeClass("active");
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

            let p = gridData[position.y][position.x];
            if (!p) {
                throw new Error("The position:(" + position.x + "," + position.y + ") is beyond the boundary.");
            }

            return p.active;
        }

        this.checkReachBottom = function (positions) {
            if (!positions || positions.length == 0) {
                throw new Error("The positions was invalid.");
            }

            let reachBottom = false;
            for (let p of positions) {
                if (p.y < gridBoundary.y1 || p.y >= gridBoundary.y2) {
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

    let singletonGrid = new Grid();
    Reflect.preventExtensions(singletonGrid);

    return singletonGrid;
});