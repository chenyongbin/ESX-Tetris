define([
    "js/var/actionDOM.js",
    "js/var/actionEnumeration.js",
    "js/common.js",
    "js/lib/jquery.js"
], function (actionDOM, actionEnum, comm) {
    'use strict';

    function Action() {
        if (!(this instanceof Action)) {
            return new Action();
        }

        // Private variables
        let self = this;
        let actionHandlerMap = new Map();

        // Private methods
        let init = function () {
            // Render html
            actionDOM.html(`
                <div class='action-left'>
                    <div class='btn btn-start' id="actionStart">START</div>
                    <div class='btn btn-pause ml10' id="actionPause">PAUSE</div>
                    <div class='btn btn-stop ml10' id="actionStop">STOP</div>
                </div>
                <div class='action-right'>
                    <div class='action-row'>                                        
                    <div class='btn' id="actionRotate">ROTATE</div>
                    </div>
                    <div class='action-row'>                    
                        <div class='btn' id="actionLeft">LEFT</div>
                        <div class='btn btn-rectangle ml20 mr20'id="actionSpace">SPACE</div>
                        <div class='btn' id="actionRight">RIGHT</div>
                    </div>
                    <div class='action-row'>
                        <div class='btn' id="actionDown">DOWN</div>
                    </div>
                </div>                
            `);

            // Register button events
            $("#actionStart,#actionPause,#actionStop,#actionLeft,#actionRotate,#actionRight,#actionSpace,#actionDown").on("click", function (e) {
                switch (e.target.id) {
                    case "actionStart": executeActionHandler(actionEnum.ACTION_START); break;
                    case "actionPause": executeActionHandler(actionEnum.ACTION_PAUSE); break;
                    case "actionStop": executeActionHandler(actionEnum.ACTION_STOP); break;
                    case "actionLeft": executeActionHandler(actionEnum.TRANSITION_LEFT); break;
                    case "actionRotate": executeActionHandler(actionEnum.TRANSITION_ROTATE); break;
                    case "actionRight": executeActionHandler(actionEnum.TRANSITION_RIGHT); break;
                    case "actionSpace": executeActionHandler(actionEnum.TRANSITION_SPACE); break;
                    case "actionDown": executeActionHandler(actionEnum.TRANSITION_DOWN); break;
                    default: console.log(`Unregistered keypress event with id=${e.target.id}.`); break;
                }
            });

            // Register keyboard event
            $(document).on("keydown", function (e) {
                switch (e.keyCode) {
                    case 32: executeActionHandler(actionEnum.TRANSITION_SPACE); break;
                    case 37: executeActionHandler(actionEnum.TRANSITION_LEFT); break;
                    case 38: executeActionHandler(actionEnum.TRANSITION_ROTATE); break;
                    case 39: executeActionHandler(actionEnum.TRANSITION_RIGHT); break;
                    case 40: executeActionHandler(actionEnum.TRANSITION_DOWN); break;
                    default: console.log(`Unregistered keypress event with keyCode=${e.keyCode}`);
                }
            });
        }

        let executeActionHandler = function (actionName, ...args) {
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

    let singletonAction = new Action();
    Reflect.preventExtensions(singletonAction);

    return singletonAction;
});