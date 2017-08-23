define([
    "../js/var/announcementDOM.js",
    '../js/lib/jquery.js'
], function (announceDOM) {
    'use strict';

    function Announcement() {
        if (!(this instanceof Announcement)) {
            return new Announcement();
        }

        // Private variables
        var self = this;

        // Private methods
        var init = function () { }

        // Public functions
        this.handleScoreChange = function (score, totalScore, clearRowCount) {
            $(".announce-score").html(score);
            $(".announce-totalscore").html(totalScore);
            $(".announce-clearcount").html(clearRowCount);
        }

        this.handleBlockChange = function (positions) {
            
        }

        init();
    }

    var singletonAnnouncement = new Announcement();

    return singletonAnnouncement;
});