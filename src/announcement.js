import "babel-polyfill";
import { announcementDOM } from "./var/doms";
import { cvtCoordinates2Str } from "./util";

const _gridRowCount = 8,
    _gridColCount = 7;

const _activateCoordinates = function (coordinates) {
    let offsetX = 0, offsetY = 0;

    for (let y = 0; y < _gridRowCount; y++) {
        announcementDOM.find(".g-row:eq(" + (y + offsetY) + ")>.g-col").removeClass("active");
    }

    if (coordinates && coordinates.length) {

        let sortX = coordinates.sort((a, b) => b.x - a.x);
        if (sortX[0].x >= _gridColCount) {
            throw new Error(`The coordinates[${cvtCoordinates2Str(coordinates)}] of next block was invalid.`);
        } else {
            offsetX = sortX[0].x >= 1 ? Math.floor((_gridColCount - sortX[0].x) / 2)
                : Math.floor((_gridColCount - 1) / 2);
        }

        let sortY = coordinates.sort((a, b) => { b.y - b.x });
        if (sortY[0].y >= _gridRowCount) {
            throw new Error(`The coordinates[${cvtCoordinates2Str(coordinates)}] of next block was invalid.`);
        } else {
            offsetY = sortY[0].Y >= 1 ? Math.floor((_gridRowCount - sortX[0].Y) / 2)
                : Math.floor((_gridRowCount - 1) / 2);
        }

        coordinates.map(p =>
            announcementDOM.find(".g-row:eq(" + (p.y + offsetY) + ")>.g-col:eq(" + (p.x + offsetX) + ")").addClass("active"));
    }
}

class Announcement {
    constructor() {
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
        for (let y = 0; y < _gridRowCount; y++) {
            grid.push("<div class='g-row'>");
            let cols = [];
            for (let x = 0; x < _gridColCount; x++) {
                cols.push("<span class='g-col g-col-none'></span>");
            }
            grid.push(cols.join(""));
            grid.push("</div>");
        }
        announcementDOM.find(".announce-grid").html(grid.join(""));
    }

    scoreChangedHandler(score, totalScore, clearRowCount) {
        $(".announce-score").html(score);
        $(".announce-totalscore").html(totalScore);
        $(".announce-clearcount").html(clearRowCount);
    }

    blockChangedHandler(coordinates) {
        _activateCoordinates(coordinates);
    }
}

const singletonAnnouncement = new Announcement();
export default singletonAnnouncement;