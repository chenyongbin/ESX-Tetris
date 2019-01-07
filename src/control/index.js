import { control as CONTROL_CONFIG } from "../config";
import Canvas from "../canvas";
import Button from "./button";

let canvas = null,
  BUTTONS_MAP = {},
  BUTTONS_EVENTHANDLERS_MAP = new Map();

/**
 * 初始化
 * @param {Element} containerDOM 容器DOM对象
 * @param {Object} { offsetX, offsetY, width, height } {偏移X，偏移Y，宽，高}
 */
const initialize = (containerDOM, { offsetX, offsetY, width, height }) => {
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
      if (BUTTONS_MAP[name].contains(clickX, clickY)) {
        // console.log(`you clicked button ${name}`);
        eventName = name;
        break;
      }
    }
    eventName && executeEventHandler(eventName);
  };

  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 32:
        executeEventHandler("DROP");
        break;
      case 37:
        executeEventHandler("LEFT");
        break;
      case 38:
        executeEventHandler("ROTATE");
        break;
      case 39:
        executeEventHandler("RIGHT");
        break;
      case 40:
        executeEventHandler("DOWN");
        break;
      case 80:
        executeEventHandler("PAUSE");
        break;
      case 82:
        executeEventHandler("RESTART");
        break;
      default:
        console.log(`Unregistered keypress event with keyCode=${e.keyCode}`);
    }
  };
};

/**
 * 获取控件板相对于页面的偏移坐标
 * @returns
 */
const getControlOffsetAgainstPage = () => {
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

/**
 * 添加事件处理程序*
 * @param {string} eventName 事件名称
 * @param {function} handler 处理器
 */
const addEventHandler = (eventName, handler) => {
  if (handler && typeof handler == "function") {
    let handlers = BUTTONS_EVENTHANDLERS_MAP.get(eventName);
    if (!handlers) handlers = [];
    handlers.push(handler);
    BUTTONS_EVENTHANDLERS_MAP.set(eventName, handlers);
  }
};

/**
 * 执行事件处理程序
 * @param {string} eventName 事件名称
 * @returns
 */
const executeEventHandler = eventName => {
  let handlers = BUTTONS_EVENTHANDLERS_MAP.get(eventName);
  if (!handlers || handlers.length == 0) return;
  // console.log(`begin to execute ${eventName}'s handlers...`);
  for (let handler of handlers) {
    handler && handler();
  }
};

/**
 * 添加掉落事件处理程序
 * @param {function} handler 处理器
 */
const addDropEventHandler = handler => {
  addEventHandler("DROP", handler);
};

/**
 * 添加左移事件处理程序
 * @param {function} handler 处理器
 */
const addLeftEventHandler = handler => {
  addEventHandler("LEFT", handler);
};

/**
 * 添加右移事件处理程序
 * @param {function} handler 处理器
 */
const addRightEventHandler = handler => {
  addEventHandler("RIGHT", handler);
};

/**
 * 添加下移事件处理程序
 * @param {function} handler 处理器
 */
const addDownEventHandler = handler => {
  addEventHandler("DOWN", handler);
};

/**
 * 添加旋转事件处理程序
 * @param {function} handler 处理器
 */
const addRotateEventHandler = handler => {
  addEventHandler("ROTATE", handler);
};

/**
 * 添加重启事件处理程序
 * @param {function} handler 处理器
 */
const addRestartEventHandler = handler => {
  addEventHandler("RESTART", handler);
};

/**
 * 添加暂停事件处理程序
 * @param {function} handler 处理器
 */
const addPauseEventHandler = handler => {
  addEventHandler("PAUSE", handler);
};

export default {
  initialize,
  addDropEventHandler,
  addLeftEventHandler,
  addRightEventHandler,
  addDownEventHandler,
  addRotateEventHandler,
  addRestartEventHandler,
  addPauseEventHandler
};
