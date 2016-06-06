'use strict';

function double_to_one(collection) {
  var Arr = [];
  collection.forEach(function (element) {
    if (element[0]) {
      getElement(element, Arr);
    }
    else {
      Arr.push(element);
    }
  });
  console.log(Arr);
  return Arr;
}

function getElement(elementArr, Arr) {
  elementArr.forEach(function (item) {
    Arr.push(item);
  })
}

module.exports = double_to_one;
