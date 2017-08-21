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
    "../../js/lib/jquery.js"
], function () {
    'use strict';

    function Grid(container, gridWidth, gridHeight) {
        if (!(this instanceof Grid)) {
            return new Grid();
        }

        if (!container) {
            throw new Error("The container was invalid.");
        }

        if (!gridWidth || gridWidth < 300 || gridWidth > 700) {
            throw new Error("The width was invalid.");
        }

        if (!gridHeight || gridHeight < 500 || gridHeight > 1000) {
            throw new Error("The height was invalid.");
        }

        var self = this;
        var gridUnitLength = 20;
        var gridContainer = null;
        var width = gridWidth;
        var height = gridHeight;

        var init = function () {
            let rCount = Math.floor(height / gridUnitLength),
                cCount = Math.floor(width / gridUnitLength);

            gridContainer = $("<div class='grid'></div>");
            for (let r = 0; r < rCount; r++) {
                let rData = [];
                let rHtml = ["<div class='g-row'>"];
                for (let c = 0; c < cCount; c++) {
                    rData.push({ active: false });
                    rHtml.push("<span class='g-col'></span>");
                }
                rHtml.push("</div>");
                self.gridPointData.push(rData);
                gridContainer.append(rHtml.join(""));
                container.append(gridContainer);
            }
        }

        this.gridPointData = [];

        this.activatePoints = function (points) {
            if (!points || points.length == 0) {
                throw new Error("The points was invalid.");
            }

            points.forEach(point => {
                gridContainer.find(".g-row:eq(" + point.y + ")").find(".g-col:eq(" + point.x + ")").addClass("active");
                console.log("x=" + point.x + ", y=" + point.y);
                self.gridPointData[point.y][point.x].active = true;
            });

            return self;
        }

        this.inactivatePoints = function (points) {
            if (!points || points.length == 0) {
                throw new Error("The points was invalid.");
            }

            points.forEach(point => {
                gridContainer.find(".g-row:eq(" + point.y + ")").find(".g-col:eq(" + point.x + ")").removeClass("active");
                self.gridPointData[point.y][point.x].active = false;
            });

            return self;
        }

        this.highlightRows = function (rows) {
            if (!rows || rows.length == 0) {
                throw new Error("The rows was invalid.");
            }

            rows.forEach(r => gridContainer.find(".g-row:eq(" + r + ")").addClass("hightlight"));

            return self;
        }

        this.unhighlightRows = function (rows) {
            if (!rows || rows.length == 0) {
                throw new Error("The rows was invalid.");
            }

            rows.forEach(r => gridContainer.find(".g-row:eq(" + r + ")").removeClass("hightlight"));

            return self;
        }

        this.inactivateRows = function (rows) {
            if (!rows || rows.length == 0) {
                throw new Error("The rows was invalid.");
            }

            rows.forEach(r => {
                gridContainer.find(".g-row:eq(" + r + ")").removeClass("active");
                self.gridPointData[r].map(point => point.active = false);
            });

            return self;
        }

        this.getActiveRows = function () {
            let rows = [];
            self.gridPointData.forEach((row, r) => {
                if (!row.includes(col => col.active == false)) {
                    rows.push(r);
                }
            });
        }

        var repaintInActivatedRow = function (r, inactiveRows) {
            if (r >= 0) {
                if (inactiveRows && inactiveRows.length) {
                    let newR = r + inactiveRows.length;
                    self.gridPointData[r].forEach((col, c) => {
                        if (col.active) {
                            col.active = false;
                            gridContainer.find(".g-row:eq(" + r + ")").find(".g-col:eq(" + c + ")").removeClass("active");

                            self.gridContainer[newR][c].active = true;
                            gridContainer.find(".g-row:eq(" + newR + ")").find(".g-col:eq(" + c + ")").addClass("active");
                        }
                    });
                    return repaintInActivatedRow(r - 1, []);
                } else {
                    let tempInactiveRows = [];
                    while (r >= 0) {
                        if (!self.gridPointData[r].includes(col => col.active == true)) {
                            inactiveRows.push(r);
                            r--;
                        } else {
                            break;
                        }
                    }
                    return repaintInActivatedRow(r, tempInactiveRows);
                }
            }
        }

        this.repaint = function () {
            let r = gridContainer.find(".g-row").length - 1;
            repaintInActivatedRow(r, []);

            return self;
        }

        this.isActive = function (point) {
            if (!point) {
                throw new Error("The point was invalid.");
            }

            return self.gridPointData[point.y][point.x].active;
        }

        this.checkReachEnd = function (points) {
            if (!points || points.length == 0) {
                throw new Error("The points was invalid.");
            }

            let farestPoint = points[0];
            points.map(point => {
                if (point.y > farestPoint.y) {
                    farestPoint = point;
                }
            });

            return (farestPoint.y == (self.gridPointData.length - 1))
                || self.gridPointData[farestPoint.y + 1][farestPoint.x].active;
        }

        init();
    }

    return Grid;
});