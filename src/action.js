import "babel-polyfill";
import { actionDOM } from "./var/doms";

const _transitionDown = "transition_down",
    _transitionLetf = "transition_left",
    _transitionRight = "transition_right",
    _transitionRotate = "transition_rotate",
    _transitionSpace = "transition_space",
    _actionStart = "action_start",
    _actionPause = "action_pause",
    _actionStop = "action_stop";

let _actionMap = new Map();

const _addActionHandler = function (actionName, handler) {
    if (_actionMap.has(actionName)) {
        _actionMap.get(actionName).add(handler);
    } else {
        _actionMap.set(actionName, new Set([handler]));
    }
}

const _onAction = function (actionName) {
    if (_actionMap.has(actionName)) {
        for (let handler of _actionMap.get(actionName)) {
            handler && handler();
        }
    }
}

class Action {
    constructor() {
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
                case "actionStart": _onAction(_actionStart); break;
                case "actionPause": _onAction(_actionPause); break;
                case "actionStop": _onAction(_actionStop); break;
                case "actionLeft": _onAction(_transitionLetf); break;
                case "actionRotate": _onAction(_transitionRotate); break;
                case "actionRight": _onAction(_transitionRight); break;
                case "actionSpace": _onAction(_transitionSpace); break;
                case "actionDown": _onAction(_transitionDown); break;
                default: console.log(`Unregistered keypress event with id=${e.target.id}.`); break;
            }
        });

        // Register keyboard event
        $(document).on("keydown", function (e) {
            switch (e.keyCode) {
                case 32: _onAction(_transitionSpace); break;
                case 37: _onAction(_transitionLetf); break;
                case 38: _onAction(_transitionRotate); break;
                case 39: _onAction(_transitionRight); break;
                case 40: _onAction(_transitionDown); break;
                default: console.log(`Unregistered keypress event with keyCode=${e.keyCode}`);
            }
        });
    }

    addTransitionDownHandler(handler) {
        _addActionHandler(_transitionDown, handler);
    }

    addTransitionLeftHandler(handler) {
        _addActionHandler(_transitionLetf, handler);
    }

    addTransitionRightHandler(handler) {
        _addActionHandler(_transitionRight, handler);
    }

    addTransitionRotateHandler(handler) {
        _addActionHandler(_transitionRotate, handler);
    }

    addTransitionSpaceHandler(handler) {
        _addActionHandler(_transitionSpace, handler);
    }

    addActionStartHandler(handler) {
        _addActionHandler(_actionStart, handler);
    }

    addActionPauseHandler(handler) {
        _addActionHandler(_actionPause, handler);
    }

    addActionStopHandler(handler) {
        _addActionHandler(_actionStop, handler);
    }
}

const singletonAction = new Action();
export default singletonAction;