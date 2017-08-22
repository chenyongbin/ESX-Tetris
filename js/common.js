define([], function () {
    'use strict';

    var getFibonacciValue = function (n) {
        function calcFibonacci(num, prev1 = 1, prev2 = 1) {
            if (num <= 1) {
                return prev2;
            }

            return calcFibonacci(num - 1, prev2, prev1 + prev2);
        }

        return calcFibonacci(n);
    }

    // 只读代理：待实现
    var readonlyProxy = new Proxy({}, {

    });

    return {
        getFibonacciValue
    }
});