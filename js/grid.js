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
    "../js/var/container",
    "../js/var/tetris.js",
    "../js/lib/jquery.js"
], function (container, tetris) {
    'use strict';

    function Grid() {
        if (!(this instanceof Grid)) {
            return new Grid();
        }

        // Private variables
        var self = this;
        var gridContainer = null;
        var gridBoundary = {
            x1: 0, x2: 0,
            y1: 0, y2: 0
        };

        // Public properties
        this.gridData = [];

        // Private methods
        var init = function () {
            let rCount = 25, cCount = 20;

            gridContainer = $("<div class='grid'></div>");
            for (let r = 0; r < rCount; r++) {
                let rData = [];
                let rHtml = ["<div class='g-row'>"];
                for (let c = 0; c < cCount; c++) {
                    rData.push({ active: false });
                    rHtml.push("<span class='g-col'></span>");
                }
                rHtml.push("</div>");
                self.gridData.push(rData);
                gridContainer.append(rHtml.join(""));
                container.append(gridContainer);
            }

            tetris.gridData = self.gridData;
            gridBoundary.y2 = self.gridData.length - 1;
            gridBoundary.x2 = self.gridData[0].length - 1;
        }

        var queryPosition = function (x, y) {
            return gridContainer.find(".g-row:eq(" + y + ")").find(".g-col:eq(" + x + ")");
        }

        var queryRow = function (y) {
            return gridContainer.find(".g-row:eq(" + y + ")");
        }

        var queryCol = function (x) {
            return gridContainer.find(".g-col:eq(" + x + ")");
        }

        var repaintInActivatedRow = function (y, inactiveRows) {
            if (r >= 0) {
                if (inactiveRows && inactiveRows.length) {
                    let newY = y + inactiveRows.length;
                    self.gridData[y].forEach((col, x) => {
                        if (col.active) {
                            col.active = false;
                            queryPosition(x, y).removeClass("active");
                            self.gridContainer[newY][x].active = true;
                            queryPosition(newY, x).addClass("active");
                        }
                    });
                    return repaintInActivatedRow(y - 1, []);
                } else {
                    let tempInactiveRows = [];
                    while (y >= 0) {
                        if (!self.gridData[y].includes(col => col.active == true)) {
                            inactiveRows.push(y);
                            y--;
                        } else {
                            break;
                        }
                    }
                    return repaintInActivatedRow(y, tempInactiveRows);
                }
            }
        }

        var hasPosition = function (positionCollection, position) {
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
                self.gridData[p.y][p.x].active = true;
            });

            return self;
        }

        this.inactivatePositions = function (positions) {
            if (!positions || positions.length == 0) {
                throw new Error("The positions was invalid.");
            }

            positions.forEach(p => {
                queryPosition(p.x, p.y).removeClass("active");
                self.gridData[p.y][p.x].active = false;
            });

            return self;
        }

        this.highlightRows = function (rows) {
            if (!rows || rows.length == 0) {
                throw new Error("The rows was invalid.");
            }

            rows.forEach(y => queryRow(y).addClass("hightlight"));

            return self;
        }

        this.unhighlightRows = function (rows) {
            if (!rows || rows.length == 0) {
                throw new Error("The rows was invalid.");
            }

            rows.forEach(y => queryRow(y).removeClass("hightlight"));

            return self;
        }

        this.inactivateRows = function (rows) {
            if (!rows || rows.length == 0) {
                throw new Error("The rows was invalid.");
            }

            rows.forEach(y => {
                queryRow(y).removeClass("active");
                self.gridData[y].map(p => p.active = false);
            });

            return self;
        }

        this.getActiveRows = function () {
            let rows = [];
            self.gridData.forEach((row, y) => {
                if (!row.includes(col => col.active == false)) {
                    rows.push(y);
                }
            });
        }

        this.repaint = function () {
            let y = self.gridData.length - 1;
            repaintInActivatedRow(y, []);
            return self;
        }

        this.isActive = function (position) {
            if (!position) {
                throw new Error("The position was invalid.");
            }

            let p = self.gridData[position.y][position.x];
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

        init();
    }

    var singletonGrid = new Grid();

    return singletonGrid;
});