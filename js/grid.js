/* 网格模块
 * 1) 初始化方块活动网格
 * 2) 渲染方块运动前、后的状态
 * 3) 清除填充满的行
 * 4) 
 */

define([
    '../js/var/tetris.js',
    "../js/lib/jquery.js"
], function (tetris) {
    'use strict';

    function Grid() {
        if (!(this instanceof Grid)) {
            return new Grid();
        }

        var self = this;
        var gridUnitLength = 20;
        var gridContainer = null;

        this.width = 400;
        this.height = 500;

        this.init = function () {
            let rCount = Math.floor(self.height / gridUnitLength),
                cCount = Math.floor(self.width / gridUnitLength);

            let gridData = [];
            let gridHtml = ["<div class='grid'><ul>"];
            for (let r = 0; r < rCount; r++) {
                let rData = [];
                let rHtml = ["<li class='g-row'>"];
                for (let c = 0; c < cCount; c++) {
                    rData.push({ active: false });
                    rHtml.push("<span class='g-col'></span>");
                }
                rHtml.push("</li>");
                gridData.push(rData);
                gridHtml.push(rHtml.join(""));
            }
            gridHtml.push("</ul></div>");

            tetris.data = gridData;
            tetris.container.html(gridHtml.join(""));
            gridContainer = $(".grid");
        }

        this.refreshBlock = function (newPoints, oldPoints) {
            oldPoints.map(point => {
                gridContainer.find(".g-row").eq(point.y).find(".g-col").eq(point.x).removeClass("active");
            });
            newPoints.map(point => {
                gridContainer.find(".g-row").eq(point.y).find(".g-col").eq(point.x).addClass("active");
            });
        }

        this.clearFillFullRows = function (rows) {
            let maxRowIndex = Math.max(...rows);

            rows.forEach(r => gridContainer.find(".g-row:eq(" + r + ")").removeClass("active"));
            gridContainer.find(".g-rows:lt(" + maxRowIndex + ")").forEach(row => {

            });
        }

        this.isActive = function (point) {
            return gridContainer.find(".g-row:eq(" + point.y + ")").find(".g-col:eq(" + point.x + ")").hasClass("active");
        }
    }

    tetris.grid = new Grid();
    tetris.inits.push(tetris.grid.init);
});