function collect_same_elements(collection_a, collection_b) {
  var newArray = [];
  collection_a.forEach(function (element) {
    if (isExist(element, collection_b)) {
      newArray.push(element);
    }
  })
  return newArray;
}

function isExist(element, collection_b) {
  for (var i = 0; i < collection_b.length; i++) {
    if (collection_b[i] === element) {
      return true;
    }
  }
  return false;
}

module.exports = collect_same_elements;
