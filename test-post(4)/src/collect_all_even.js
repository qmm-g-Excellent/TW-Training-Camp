function collect_same_elements(collection_a, object_b) {
    var commonValue = [];
    collection_a.forEach(function (element) {
        if (isExist(element.key, object_b, commonValue)) {
            commonValue.push(element.key);
        }
    });
    return commonValue;
}

function isExist(value, object_b) {
    for (var i = 0; i < object_b.value.length; i++) {
        if (object_b.value[i] === value) {
            return true;
        }
    }
    return false;
}

module.exports = collect_same_elements;
