'use strict';

function fibonacci_series(n) {
    var Array = [];
    Array.push(0);
    getFibonacci(n, Array);
    return Array;
}

function getFibonacci(n, Array) {
    for (var i = 1; i <= n; i++) {
        if (i == 1) {
            Array.push(1);
        } else {
            Array.push(Array[i - 1] + Array[i - 2]);
        }
    }
}

module.exports = fibonacci_series;
