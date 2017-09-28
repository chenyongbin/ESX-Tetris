import "babel-polyfill";

/* 计算斐波那契数列值    
 */
const getFibonacciValue = function (n) {
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
const convertCoordinatesToString = function (coordinates) {
    if (coordinates && coordinates.length) {
        return coordinates.map(c => `(${c.x},${c.y})`).join("");
    }

    return "";
}

/**
 * 判断curClass是否继承自targetClass
 * @param {*} curClass 
 * @param {*} targetClass 
 */
const isInheritedFrom = function (curClass, targetClass) {
    return Reflect.getPrototypeOf(curClass) === targetClass;
}

/**
 * 判断curInstance是否是targetClass的实例
 * @param {*} curInstance 
 * @param {*} targetClass 
 */
const isInstanceOf = function (curInstance, targetClass) {
    return isInheritedFrom(curInstance.constructor, targetClass);
}

export {
    getFibonacciValue as getFibValue,
    convertCoordinatesToString as cvtCoordinates2Str,
    isInheritedFrom,
    isInstanceOf,
}