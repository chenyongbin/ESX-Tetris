/*
    渲染模块
    初始化：初始化游戏窗体
 */
define([
    '../js/jquery.js',
    '../js/common.js'
], function (jquery, comm) {
    'use strict';

    var square = function (x, y) {
        return "<span class='g-col' data-x='" + x + "' data-y='" + y + "'></span>";
    }

    var squares = function (...args) {
        if (!args || args.length == 0) {
            throw new comm.ArgsError("Please set the squares position.");
        }

        var tetrisData = window.tetrisData || [];

        if (tetrisData && tetrisData.length) {
            for (let p of args) {
                $("span[data-x=" + p.x + "][data-y=" + p.y + "]").addClass("represented");
            }
        }
    }

    var initialize = function (container, tetrisData) {
        if (!container) {
            throw new comm.ArgsError();
        }

        let rCount = 10, cCount = 8;
        let ulHtml = ["<ul>"];
        for (let i = 0; i < rCount; i++) {
            let liHtml = ["<li class='g-row'>"];
            let liData = [];
            for (let j = 0; j < cCount; j++) {
                liHtml.push(square(i, j));
                liData.push({
                    represented: false
                });
            }
            liHtml.push("</li>");
            ulHtml.push(liHtml.join(""));
            tetrisData.push(liData);
        }

        ulHtml.push("</ul>");
        $("#" + container).html(ulHtml.join(""));
    }

    return {
        initialize
    }
});