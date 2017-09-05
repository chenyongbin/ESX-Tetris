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
const convertPositionsToString = function (positions) {
    if (positions && positions.length) {
        return positions.map(p => `(${p.x},${p.y})`).join("");
    }

    return "";
}

export {
    getFibonacciValue,
    convertPositionsToString
}