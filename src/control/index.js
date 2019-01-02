import { control as CONTROL_CONFIG } from "../config";
import Canvas from "../canvas";
import Button from "./button";

let canvas = null,
  BUTTONS_MAP = {},
  BUTTONS_EVENTHANDLERS_MAP = new Map();

const initialize = function(containerDOM, { offsetX, offsetY, width, height }) {
  canvas = new Canvas(
    containerDOM,
    offsetX,
    offsetY,
    width,
    height,
    "控制器主画布"
  );
  canvas.setStyles(["z-index:3;"]);

  let radius = (height - 2 * CONTROL_CONFIG.padding) / 6;
  BUTTONS_MAP["DROP"] = new Button(
    canvas,
    CONTROL_CONFIG.padding + 2 * radius,
    CONTROL_CONFIG.padding,
    radius,
    "掉落",
    "Drop Button"
  );
  BUTTONS_MAP["LEFT"] = new Button(
    canvas,
    CONTROL_CONFIG.padding,
    CONTROL_CONFIG.padding + 2 * radius,
    radius,
    "左移",
    "Left Button"
  );
  BUTTONS_MAP["RIGHT"] = new Button(
    canvas,
    CONTROL_CONFIG.padding + 4 * radius,
    CONTROL_CONFIG.padding + 2 * radius,
    radius,
    "右移",
    "Right Button"
  );
  BUTTONS_MAP["DOWN"] = new Button(
    canvas,
    CONTROL_CONFIG.padding + 2 * radius,
    CONTROL_CONFIG.padding + 4 * radius,
    radius,
    "下移",
    "Drop Button"
  );
  BUTTONS_MAP["ROTATE"] = new Button(
    canvas,
    width - CONTROL_CONFIG.padding - 4 * radius,
    height - CONTROL_CONFIG.padding - 5 * radius,
    radius * 2,
    "旋转",
    "Rotate Button"
  );
  BUTTONS_MAP["RESTART"] = new Button(
    canvas,
    width - CONTROL_CONFIG.padding - 5.5 * radius,
    CONTROL_CONFIG.padding,
    radius * 0.8,
    "重启",
    "Restart Button",
    {
      showShadow: false,
      stopColor1: "darkgreen",
      stopColor2: "darkgreen"
    }
  );
  BUTTONS_MAP["PAUSE"] = new Button(
    canvas,
    width - CONTROL_CONFIG.padding - 7.5 * radius,
    CONTROL_CONFIG.padding,
    radius * 0.8,
    "暂停",
    "Pause Button",
    {
      showShadow: false,
      stopColor1: "darkgreen",
      stopColor2: "darkgreen"
    }
  );

  let { controlPageX, controlPageY } = getControlOffsetAgainstPage();
  canvas.canvas.onclick = function(e) {
    let eventName = "",
      clickX = e.pageX - controlPageX,
      clickY = e.pageY - controlPageY;
    for (let name in BUTTONS_MAP) {
      if (BUTTONS_MAP[name].isPointInArea(clickX, clickY)) {
        console.log(`you clicked button ${name}`);
        eventName = name;
        break;
      }
    }
    eventName && executeButtonEventHandler(eventName);
  };

  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 32:
        executeButtonEventHandler("DROP");
        break;
      case 37:
        executeButtonEventHandler("LEFT");
        break;
      case 38:
        executeButtonEventHandler("ROTATE");
        break;
      case 39:
        executeButtonEventHandler("RIGHT");
        break;
      case 40:
        executeButtonEventHandler("DOWN");
        break;
      case 80:
        executeButtonEventHandler("PAUSE");
        break;
      case 82:
        executeButtonEventHandler("RESTART");
        break;
      default:
        console.log(`Unregistered keypress event with keyCode=${e.keyCode}`);
    }
  };
};

const getControlOffsetAgainstPage = function() {
  if (!canvas) return { offsetX: 0, offsetY: 0 };
  let x = 0,
    y = 0,
    e = canvas.canvas;
  while (e !== null) {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent;
  }
  return { controlPageX: x, controlPageY: y };
};

const addButtonEventHandler = function(eventName, handler) {
  if (handler && typeof handler == "function") {
    let handlers = BUTTONS_EVENTHANDLERS_MAP.get(eventName);
    if (!handlers) handlers = [];
    handlers.push(handler);
    BUTTONS_EVENTHANDLERS_MAP.set(eventName, handlers);
  }
};

const executeButtonEventHandler = function(eventName) {
  let handlers = BUTTONS_EVENTHANDLERS_MAP.get(eventName);
  if (!handlers || handlers.length == 0) return;
  console.log(`begin to execute ${eventName}'s handlers...`);
  for (let handler of handlers) {
    handler && handler();
  }
};

const addDropButtonEventHandler = function(handler) {
  addButtonEventHandler("DROP", handler);
};

const addLeftButtonEventHandler = function(handler) {
  addButtonEventHandler("LEFT", handler);
};

const addRightButtonEventHandler = function(handler) {
  addButtonEventHandler("RIGHT", handler);
};

const addDownButtonEventHandler = function(handler) {
  addButtonEventHandler("DOWN", handler);
};

const addRotateButtonEventHandler = function(handler) {
  addButtonEventHandler("ROTATE", handler);
};

const addRestartButtonEventHandler = function(handler) {
  addButtonEventHandler("RESTART", handler);
};

const addPauseButtonEventHandler = function(handler) {
  addButtonEventHandler("PAUSE", handler);
};

export default {
  initialize,
  addDropButtonEventHandler,
  addLeftButtonEventHandler,
  addRightButtonEventHandler,
  addDownButtonEventHandler,
  addRotateButtonEventHandler,
  addRestartButtonEventHandler,
  addPauseButtonEventHandler
};
