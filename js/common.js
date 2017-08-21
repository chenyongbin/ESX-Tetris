define([], function () {
    'use strict';

    function getFibonacciValue(n) {
        function calcFibonacci(num, prev1 = 1, prev2 = 1) {
            if (num <= 1) {
                return prev2;
            }

            return calcFibonacci(num - 1, prev2, prev1 + prev2);
        }

        return calcFibonacci(n);
    }

    return {
        getFibonacciValue
    }
});