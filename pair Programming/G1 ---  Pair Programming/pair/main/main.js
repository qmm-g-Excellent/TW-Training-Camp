function printReceipt(inputs) {
    var cartItems = buildCartItems(inputs);
    var promotions = loadPromotions();
    var receiptItems = buildReceiptItems(cartItems, promotions);
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

function buildReceiptItems(cartItems, promotions) {
    var receiptItems = [];
    var subtotal = 0;
    cartItems.forEach(function (cartItem) {
        var save = 0;
        subtotal = cartItem.item.price * cartItem.count;
        var promotion = findPromotion(cartItem.item.barcode, promotions);
        if (promotions[0].type === 'BUY_THREE_GET_ONE_FREE' && promotion) {
            save = parseInt((cartItem.count / 4)) * cartItem.item.price;
            subtotal -= save;
        }
        receiptItems.push({cartItem: cartItem, subtotal: subtotal, save: save});
    });
    return receiptItems;
}

function findPromotion(barcode, promotions) {
    var item;
    promotions[0].barcodes.forEach(function (element) {
        if (barcode === element) {
            item = element;
        }
    });
    return item;
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
    return "名称：" + element.item.name + "，数量：" + element.count +
        element.item.unit + "，单价：" + format(element.item.price) + "(元)";

}

function buildPromoteItem(element) {
    var count = parseInt(element.cartItem.count / 4);
    return "名称：" + element.cartItem.item.name +
        "，数量：" + count + element.cartItem.item.unit + '\n'
}


function generateReceiptText(receipt) {
    var formatReceipt = [];
    var promoteItem = '买三免一商品：';
    formatReceipt[0] = ("***<没钱赚商店>收据***\n");
    receipt.receiptItems.forEach(function (receiptItem) {
        if (receiptItem.save) {
            promoteItem += buildPromoteItem(receiptItem);
        }
        formatReceipt += buildString(receiptItem.cartItem) + "，小计：" + format(receiptItem.subtotal) + "(元)\n";
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
