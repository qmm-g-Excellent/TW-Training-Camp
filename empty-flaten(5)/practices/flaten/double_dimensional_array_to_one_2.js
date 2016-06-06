'use strict';

function double_to_one(collection) {
  var Array = [];
  collection.forEach(function (element) {
    if (element[0]) {
      getElement(element, Array);
    }
    else {
      Array.push(element);
    }
  });
  return Array;
}

function getElement(elementArr, Array) {
  elementArr.forEach(function (element) {
    if (isExist(element, Array)) {
      Array.push(element);
    }
  });
}

function isExist(element, Array) {
  for (var i = 0; i < Array.length; i++) {
    if (Array[i] === element) {
      return false;
    }
  }
  return true;
}

module.exports = double_to_one;
