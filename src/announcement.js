import "babel-polyfill";
import "../lib/jquery";
import { announcementDOM } from "./var/doms";
import { cvtCoordinates2Str } from "./util";

function Announcement() {
    if (!(this instanceof Announcement)) {
        return new Announcement();
    }

    // Private variables
    let self = this;
    let gridRowCount = 8;
    let gridColCount = 7;

    // Private methods
    const init = function () {
        announcementDOM.html(`
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
                cols.push("<span class='g-col g-col-none'></span>");
            }
            grid.push(cols.join(""));
            grid.push("</div>");
        }
        announcementDOM.find(".announce-grid").html(grid.join(""));
    }

    const activatePositions = function (positions) {
        let offsetX = 0, offsetY = 0;

        for (let y = 0; y < gridRowCount; y++) {
            announcementDOM.find(".g-row:eq(" + (y + offsetY) + ")>.g-col").removeClass("active");
        }

        if (positions && positions.length) {

            let sortX = positions.sort((a, b) => b.x - a.x);
            if (sortX[0].x >= gridColCount) {
                throw new Error(`The positions[${cvtCoordinates2Str(positions)}] of next block was invalid.`);
            } else {
                offsetX = sortX[0].x >= 1 ? Math.floor((gridColCount - sortX[0].x) / 2)
                    : Math.floor((gridColCount - 1) / 2);
            }

            let sortY = positions.sort((a, b) => { b.y - b.x });
            if (sortY[0].y >= gridRowCount) {
                throw new Error(`The positions[${cvtCoordinates2Str(positions)}] of next block was invalid.`);
            } else {
                offsetY = sortY[0].Y >= 1 ? Math.floor((gridRowCount - sortX[0].Y) / 2)
                    : Math.floor((gridRowCount - 1) / 2);
            }

            positions.map(p =>
                announcementDOM.find(".g-row:eq(" + (p.y + offsetY) + ")>.g-col:eq(" + (p.x + offsetX) + ")").addClass("active"));
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

const singletonAnnouncement = new Announcement();
export default singletonAnnouncement;