function calculate_median(arr) {
    var even = getOdd(arr);
    var median = getMedian(even);
    return median;
}

function getOdd(arr) {
    var oddArr = [];
    for (var i = 1; i < arr.length; i += 2) {
        oddArr.push(arr[i]);
    }
    return oddArr;
}

function getMedian(even) {
    var middle;
    var temp = Math.floor(even.length / 2);
    if (even.length % 2 != 0) {
        middle = even[temp];
    }
    else {
        middle = (even[temp] + even[temp - 1]) / 2;
    }
    return middle;
}

module.exports = calculate_median;
