/**
 * @file 定时器模块
 * @module timer
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

class TetrisTimer {
    constructor(interval, fn) {
        this.interval = interval;
        this.intervalFn = fn;
        this.isPaused = false;
    }

    /**
     * 启动
     */
    start() { }

    /**
     * 暂停
     */
    pause() { }

    /**
     * 继续
     */
    resume() { }

    /**
     * 停止
     */
    stop() { }
}

export default TetrisTimer