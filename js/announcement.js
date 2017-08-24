define([
    "../js/var/announcementDOM.js",
    "../js/common.js",
    '../js/lib/jquery.js'
], function (announceDOM, comm) {
    'use strict';

    function Announcement() {
        if (!(this instanceof Announcement)) {
            return new Announcement();
        }

        // Private variables
        var self = this;
        var gridRowCount = 8;
        var gridColCount = 7;

        // Private methods
        var init = function () {
            announceDOM.html(`
                <h4>得分</h4>
                <p class="announce-score">0</p>
                <h4>总分</h4>
                <p class="announce-totalscore">0</p>
                <h4>消除行数</h4>
                <p class="announce-clearcount">0</p>
                <h4>下个方块</h4>
                <div class="announce-grid"></div>
            `);

            let grid = [];
            for (let y = 0; y < gridRowCount; y++) {
                grid.push("<div class='g-row'>");
                let cols = [];
                for (let x = 0; x < gridColCount; x++) {
                    cols.push("<span class='g-col'></span>");
                }
                grid.push(cols.join(""));
                grid.push("</div>");
            }
            announceDOM.find(".announce-grid").html(grid.join(""));
        }

        var activatePositions = function (positions) {
            let offsetX = 0, offsetY = 0;

            for (let y = 0; y < gridRowCount; y++) {
                announceDOM.find(".g-row:eq(" + (y + offsetY) + ")").find(".g-col").removeClass("active");
            }

            if (positions && positions.length) {

                let sortX = positions.sort((a, b) => b.x - a.x);
                if (sortX[0].x >= gridColCount) {
                    throw new Error(`The positions[${comm.convertPositionsToString(positions)}] of next block was invalid.`);
                } else {
                    offsetX = sortX[0].x >= 1 ? Math.floor((gridColCount - sortX[0].x) / 2)
                        : Math.floor((gridColCount - 1) / 2);
                }

                let sortY = positions.sort((a, b) => { b.y - b.x });
                if (sortY[0].y >= gridRowCount) {
                    throw new Error(`The positions[${comm.convertPositionsToString(positions)}] of next block was invalid.`);
                } else {
                    offsetY = sortY[0].Y >= 1 ? Math.floor((gridRowCount - sortX[0].Y) / 2)
                        : Math.floor((gridRowCount - 1) / 2);
                }

                positions.map(p =>
                    announceDOM.find(".g-row:eq(" + (p.y + offsetY) + ")").find(".g-col:eq(" + (p.x + offsetX) + ")").addClass("active"));
            }
        }

        // Public functions
        this.handleScoreChange = function (score, totalScore, clearRowCount) {
            $(".announce-score").html(score);
            $(".announce-totalscore").html(totalScore);
            $(".announce-clearcount").html(clearRowCount);
        }

        this.handleBlockChange = function (positions) {
            activatePositions(positions);
        }

        init();
    }

    var singletonAnnouncement = Object.create(comm.getReadonlyProxy(new Announcement(), []));

    return singletonAnnouncement;
});