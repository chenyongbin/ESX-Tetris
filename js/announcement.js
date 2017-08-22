define([
    "../js/var/container.js",
    '../js/lib/jquery.js'
], function (container) {
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
        this.handleScoreChange = function (score, totalScore) {
            console.log("Current score is: " + score + ", and TotalScore is: " + totalScore);
        }

        this.handleBlockChange = function (positions) {
            console.log(positions);
        }

        init();
    }

    var singletonAnnouncement = new Announcement();

    return singletonAnnouncement;
});