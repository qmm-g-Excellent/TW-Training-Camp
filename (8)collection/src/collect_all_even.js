'use strict';

function collect_all_even(collection) {
    var Array = [];
    collection.forEach(function (element) {
        if (element % 2 === 0) {
            Array.push(element);
        }
    })
    return Array;
}

module.exports = collect_all_even;

