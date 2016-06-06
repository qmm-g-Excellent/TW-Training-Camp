'use strict';

function thousands_separators(num) {
    var stringNum = num.toString().split(".");
    var integers = stringNum[0];
    var decimals =  stringNum[1];
    var reverseNumber = reverse(integers);
    var formatNum = formatNumber(reverseNumber);
    var sortNum = reverse(formatNum);
    var output = buildOutput(sortNum);
    if(decimals) {
            output += '.' + decimals;
    }
    return output;
}

function reverse(integer){
    var array = [];
    for(var i = (integer.length - 1); ; i--){
       array.push(integer[i]);
        if(i === 0){
            break;
        }
    }
    return array;
}

function formatNumber(reverseNumber){
    var digits = [];
    for(var i = 1 ; i <= reverseNumber.length ; i++){
        digits.push(reverseNumber[i-1]);
        if(i % 3 === 0 && i != reverseNumber.length)
            digits.push(",");
    }
    return digits;
}

function buildOutput(digits){
    var output ='';
    digits.forEach(function(element){
        output += element;
    });
    return output;
}

module.exports = thousands_separators;
