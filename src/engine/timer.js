/**
 * @file 定时器模块
 * @module timer
 * @author chenyongbin <chenyongbin789@163.com>
 * @version 0.0.1
 */

class TetrisTimer {
    /**
     * 
     * @param {number}} interval - 定时器间隔时间，单位毫秒
     * @param {function} fn - 定时器间隔执行方法
     */
    constructor(interval, fn) {
        this._isPaused = false;
        this._timerId = -1;
        this.interval = interval;
        this.intervalFn = () => {
            !this._isPaused && fn && fn();
        };        
    }

    /**
     * 启动
     */
    start() {
        this._timerId = setInterval(this.intervalFn, this.interval);
    }

    /**
     * 暂停
     */
    pause() {
        this._isPaused = true;
    }

    /**
     * 继续
     */
    resume() {
        this._isPaused = false;
    }

    /**
     * 停止
     */
    stop() {
        this._isPaused = false;
        clearInterval(this._timerId);
    }

    /**
     * 检查定时器是否暂停
     */
    isPaused() {
        return this._isPaused;
    }
}

export default TetrisTimer