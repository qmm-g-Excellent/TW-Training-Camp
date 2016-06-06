function printReceipt(inputs) {
    var cartItems = buildCartItems(inputs);
    var receiptItems = buildReceiptItems(cartItems);
    var receipt = buildReceipt(receiptItems);
    var formatReceipt = generateReceiptText(receipt);
    console.log(formatReceipt);
}

function buildCartItems(inputs) {
    var cartItems = [];
    var allItems = loadAllItems();
    inputs.forEach(function (item) {
        var count = 1;
        var newArray = item.split("-");
        item = newArray[0];
        if (newArray[1]) {
            count = parseFloat(newArray[1]);
        }
        var cartItem = isExist(item, cartItems);
        if (cartItem) {
            cartItem.count++;
        }
        else {
            var allItem = findAllItems(item, allItems);
            cartItems.push({item: allItem, count: count});
        }
    });
    return cartItems;
}

function isExist(item, cartItems) {
    var element;
    cartItems.forEach(function (cartItem) {
        if (cartItem.item.barcode === item) {
            element = cartItem;
        }
    });
    return element;
}

function findAllItems(item, allItems) {
    var element = {};
    allItems.forEach(function (allItem) {
        if (allItem.barcode === item) {
            element = allItem;

        }
    });
    return element;
}

function buildReceiptItems(cartItems) {
    var receiptItems = [];
    var subtotal = 0;
    cartItems.forEach(function (cartItem) {
        var save = 0;
        subtotal = cartItem.item.price * cartItem.count;
        if (cartItem.count >= 10) {
            save = cartItem.item.price * cartItem.count * format(1 - loadPromotions());
            subtotal -= save;
        }
        receiptItems.push({cartItem: cartItem, subtotal: subtotal, save: save});
    });
    return receiptItems;
}

function buildReceipt(receiptItems) {
    var total = 0, savedtotal = 0;
    receiptItems.forEach(function (receiptItem) {
        total += receiptItem.subtotal;
        savedtotal += receiptItem.save;
    });
    var receipt = {
        receiptItems: receiptItems,
        total: total,
        savedTotal: savedtotal
    };
    return receipt;
}

function format(account) {
    return account.toFixed(2);
}

function buildString(element) {
    var string = "名称：" + element.cartItem.item.name +
        "，数量：" + element.cartItem.count + element.cartItem.item.unit +
        "，单价：" + format(element.cartItem.item.price) + "(元)" +
        "，小计：" + format(element.subtotal) + "(元)";
    if (element.save != 0) {
        string += '，优惠:' + format(element.save) + "(元)";
    }
    return string;
}

function buildPromoteItem(element) {
    var count = parseInt(element.cartItem.count / 10);
    return "名称：" + element.cartItem.item.name +
        "，数量：" + count + element.cartItem.item.unit + '\n'
}


function generateReceiptText(receipt) {
    var formatReceipt = [];
    var promoteItem = '批发价出售商品：';
    formatReceipt[0] = ("***<没钱赚商店>收据***\n");
    receipt.receiptItems.forEach(function (receiptItem) {
        formatReceipt += buildString(receiptItem);
        if (receiptItem.save) {
            promoteItem += buildPromoteItem(receiptItem);
        }
        formatReceipt += '\n';
    });
    if (format(receipt.savedTotal) != 0) {
        formatReceipt += promoteItem;
        formatReceipt += "总计：" + format(receipt.total) + "(元)";
        formatReceipt += "节省：" + format(receipt.savedTotal) + "(元)\n";
    }
    else {
        formatReceipt += "总计：" + format(receipt.total) + "(元)\n";
    }
    formatReceipt += "----------------------";
    return formatReceipt;
}
