define(function () {
    'use strict';

    function Block(points) {
        if (!(this instanceof Block)) {
            return new Block(points);
        }

        if (!points || !(points instanceof Array) || points.length == 0) {
            throw new Error("The points is invalid or null.");
        }

        var self = this;

        this.points = [];

        this.transform_down = function () {
            self.points.map(point => point.y += 1);
        }

        this.transform_left = function () {
            self.points.map(point => point.x -= 1)
        }

        this.transform_right = function () {
            self.points.map(point => point.x += 1);
        }

        this.transform_rotate = function () { }

        points.forEach(point => self.points.push({ x: point.x, y: point.y }));
    }

    return Block;
});