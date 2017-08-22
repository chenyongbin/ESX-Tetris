define([
    "../js/var/container.js",
    "../js/var/tetris.js",
    "../js/var/actionEnumeration.js",
    "../js/lib/jquery.js"
], function (container, tetris, actionEnum) {
    'use strict';

    function Action() {
        if (!(this instanceof Action)) {
            return new Action();
        }

        // Private variables
        var self = this;
        var actionHandlerMap = new Map();

        // Private methods
        var init = function () {
            $("#actionLeft").on("click", function () {
                executeActionHandler(actionEnum.TRANSFORM_LEFT);
            });

            $("#actionRotate").on("click", function () {
                executeActionHandler(actionEnum.TRANSFORM_ROTATE);
            });

            $("#actionRight").on("click", function () {
                executeActionHandler(actionEnum.TRANSFORM_RIGHT);
            });

            $("#actionSpace").on("click", function () {
                executeActionHandler(actionEnum.TRANSFORM_SPACE);
            });

            $("#actionDown").on("click", function () {
                executeActionHandler(actionEnum.TRANSFORM_DOWN);
            });

            registerActions();
        }

        var registerActions = function () {
            // Register keyboard actions
            $(document).on("keydown", function (e) {
                switch (e.keyCode) {
                    case 32: executeActionHandler(actionEnum.TRANSFORM_SPACE); break;
                    case 37: executeActionHandler(actionEnum.TRANSFORM_LEFT); break;
                    case 38: executeActionHandler(actionEnum.TRANSFORM_ROTATE); break;
                    case 39: executeActionHandler(actionEnum.TRANSFORM_RIGHT); break;
                    case 40: executeActionHandler(actionEnum.TRANSFORM_DOWN); break;
                }
                e.preventDefault();
            });
        }

        var executeActionHandler = function (actionName, ...args) {
            if (actionHandlerMap.has(actionName)) {
                let handlers = actionHandlerMap.get(actionName);
                if (handlers && handlers.size) {
                    for (let handler of handlers) {
                        handler && handler(...args);
                    }
                }
            }
        }

        // Public functions
        this.addActionHandler = function (actionName, handler) {
            if (actionHandlerMap.has(actionName)) {
                actionHandlerMap.get(actionName).add(handler);
            } else {
                actionHandlerMap.set(actionName, new Set([handler]));
            }
        }

        init();
    }

    var singletonAction = new Action();

    return singletonAction;
});