/**
 * @file 定时器模块
 * @version 1.0.0
 */

let options = {
    inetrval: 0,
    handler: null
  },
  isPaused = false,
  timerID = -1;

/**
 * 初始化
 * @param {integer} interval 定时时间
 * @param {function} handler 定时器处理器
 */
const initialize = (interval, handler) => {
  options.interval = interval;
  options.handler = handler;
};

/**
 * 启动
 */
const start = () => {
  stop();
  timerID = setInterval(() => {
    !isPaused && options.handler && options.handler();
  }, options.interval);
};

/**
 * 暂停
 */
const pause = () => {
  isPaused = true;
};

/**
 * 继续
 */
const resume = () => {
  isPaused = false;
};

/**
 * 停止
 */
const stop = () => {
  isPaused = false;
  timerID && clearInterval(timerID);
};

export default {
  initialize,
  start,
  pause,
  resume,
  stop
};
