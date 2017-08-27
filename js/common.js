define([], function () {
    'use strict';

    /* 计算斐波那契数列值    
     */
    let getFibonacciValue = function (n) {
        function calcFibonacci(num, prev1 = 1, prev2 = 1) {
            if (num <= 1) {
                return prev2;
            }

            return calcFibonacci(num - 1, prev2, prev1 + prev2);
        }

        return calcFibonacci(n);
    }

    /* 将坐标数组转换为字符串     
     */
    let convertPositionsToString = function (positions) {
        if (positions && positions.length) {
            return positions.map(p => `(${p.x},${p.y})`).join("");
        }

        return "";
    }

    /* 创建对象代理
     * 1) targetObject: 目标对象，required
     * 2) handler: 目标对象处理对象，required
     * 3) 返回代理对象
     */
    let getObjectProxy = function (targetObject, handler) {
        if (!targetObject) {
            throw new Error("The targetObject was not specified.");
        }

        if (!handler) {
            throw new Error("The proxy handler was not specified.");
        }

        if (!(handler instanceof Object)) {
            throw new Error("The proxy handler was invalid.");
        }

        return new Proxy(targetObject, handler);
    }

    /* 创建对象只读代理
     * 1) targetObject: 目标对象，required
     * 2) readonlyPropertyNames: 只读属性名称数组，若为空，则目标对象全部自有属性和自有方法均为只读
     * 3) 返回代理对象，使用该代理可以创建真正的只读对象，使用方法是Object.create(readonlyProxy)
     */
    let getReadonlyProxy = function (targetObject, ...readonlyPropertyNames) {
        if (!targetObject) {
            throw new Error("The targetObject was not specified.");
        }

        let ownPropertyNames = Object.getOwnPropertyNames(targetObject);
        return getObjectProxy(targetObject, {
            set: function (target, propertyName, newValue) {
                if (!ownPropertyNames.includes(propertyName)) {
                    throw new Error(`The property '${propertyName}' not found in ${target.constructor.name}.`);
                }

                if (!!readonlyPropertyNames && readonlyPropertyNames.length
                    && !readonlyPropertyNames.includes(propertyName)) {
                    target[propertyName] = newValue;
                }
            }
        });
    }

    /* 创建存取器代理，可自定义属性的getter/settter
     * 1) targetObject: 目标对象, required
     * 2) propertyHandlers: 属性处理对象，结构{name:propertyName, getHandler:function(){}, setHandler:function(newValue){}}
     * 3) 返回代理对象
     */
    let getCustomAccessorProxy = function (targetObject, ...propertyHandlers) {
        if (!targetObject) {
            throw new Error("The targetObject was not specified.");
        }

        let ownPropertyNames = Object.getOwnPropertyNames(targetObject);
        return getObjectProxy(targetObject, {
            set: function (target, propertyName, newValue) {
                if (!ownPropertyNames.includes(propertyName)) {
                    throw new Error(`The property '${propertyName}' not found in ${target.constructor.name}.`);
                }

                if (!!propertyHandlers && propertyHandlers.length) {
                    let handlers = propertyHandlers.filter(p => p.name == propertyName);
                    if (handlers && handlers.length > 0) {
                        handlers[0].setHandler(newValue);
                    }
                }
            },
            get: function (target, propertyName) {
                if (!ownPropertyNames.includes(propertyName)) {
                    throw new Error(`The property '${propertyName}' not found in ${target.constructor.name}.`);
                }

                if (!!propertyHandlers && propertyHandlers.length) {
                    let handlers = propertyHandlers.filter(p => p.name == propertyName);
                    if (handlers && handlers.length > 0) {
                        handlers[0].getHandler();
                    }
                }
            }
        });
    }

    return {
        getFibonacciValue,
        convertPositionsToString,
        getObjectProxy,
        getReadonlyProxy,
        getCustomAccessorProxy
    }
});