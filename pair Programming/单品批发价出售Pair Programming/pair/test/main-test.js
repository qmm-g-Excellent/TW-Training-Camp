describe('pos', function () {
    var allItems;
    var inputs;

    beforeEach(function () {
        allItems = loadAllItems();
        inputs = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000005',
            'ITEM000005',
            'ITEM000005'
        ];
    });


    describe('buildCartItems()', function () {
        var input = ['ITEM000001',
            'ITEM000003-2'];
        it('should get cartItems', function () {
            var cartItems = buildCartItems(input);
            expectCartItems = [{
                item: {
                    barcode: 'ITEM000001',
                    name: '羽毛球',
                    unit: '个',
                    category: '用品',
                    subCategory: '娱乐',
                    price: 1.00
                },
                count: 1
            },
                {
                    item: {
                        barcode: 'ITEM000003',
                        name: '荔枝',
                        unit: '斤',
                        category: '食品',
                        subCategory: '水果',
                        price: 15.00
                    },
                    count: 2
                }];
            expect(cartItems).toEqual(expectCartItems);
        });

    });


    describe('buildReceiptItems()', function () {
        var cartItems = [{
            item: {
                barcode: 'ITEM000001',
                name: '羽毛球',
                unit: '个',
                category: '用品',
                subCategory: '娱乐',
                price: 1.00
            },
            count: 10
        },
            {
                item: {
                    barcode: 'ITEM000005',
                    name: '方便面',
                    unit: '袋',
                    category: '食品',
                    subCategory: '面食',
                    price: 4.50
                },
                count: 2
            }];

        it('should get receiptItems', function () {
            var promotions = loadPromotions();
            var receiptItems = buildReceiptItems(cartItems, promotions)
            expectReceiptItems = [
                {
                    cartItem: {
                        item: {
                            barcode: 'ITEM000001',
                            name: '羽毛球',
                            unit: '个',
                            category: '用品',
                            subCategory: '娱乐',
                            price: 1.00
                        },
                        count: 10
                    },
                    subtotal: 9.50,
                    save: 0.50
                },
                {
                    cartItem: {
                        item: {
                            barcode: 'ITEM000005',
                            name: '方便面',
                            unit: '袋',
                            category: '食品',
                            subCategory: '面食',
                            price: 4.50
                        },
                        count: 2
                    },
                    subtotal: 9.00,
                    save: 0
                }
            ];
            expect(receiptItems).toEqual(expectReceiptItems);
        });
    });

    describe('buildReceipt()', function () {
        var receiptItems = [
            {
                cartItem: {
                    item: {
                        barcode: 'ITEM000001',
                        name: '羽毛球',
                        unit: '个',
                        category: '用品',
                        subCategory: '娱乐',
                        price: 1.00
                    },
                    count: 10
                },
                subtotal: 9.50,
                save: 0.50
            },
            {
                cartItem: {
                    item: {
                        barcode: 'ITEM000003',
                        name: '荔枝',
                        unit: '斤',
                        category: '食品',
                        subCategory: '水果',
                        price: 15.00
                    },
                    count: 2
                },
                subtotal: 30.00,
                save: 0
            }
        ];
        it('should get receipt', function () {
            var receipt = buildReceipt(receiptItems);
            expectReceipt = {
                receiptItems: [{
                    cartItem: {
                        item: {
                            barcode: 'ITEM000001',
                            name: '羽毛球',
                            unit: '个',
                            category: '用品',
                            subCategory: '娱乐',
                            price: 1.00
                        },
                        count: 10
                    },
                    subtotal: 9.50,
                    save: 0.50
                },
                    {
                        cartItem: {
                            item: {
                                barcode: 'ITEM000003',
                                name: '荔枝',
                                unit: '斤',
                                category: '食品',
                                subCategory: '水果',
                                price: 15.00
                            },
                            count: 2
                        },
                        subtotal: 30.00,
                        save: 0
                    }],
                total: 39.50,
                savedTotal: 0.50
            };
            expect(receipt).toEqual(expectReceipt);
        });
    });


    it('should print correct text', function () {
        spyOn(console, 'log');
        printReceipt(inputs);
        var expectText =
            '***<没钱赚商店>收据***\n' +
            '名称：羽毛球，数量：5个，单价：1.00(元)，小计：5.00(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：方便面，数量：3袋，单价：4.50(元)，小计：13.50(元)\n' +
           // '买三免一商品：名称：羽毛球，数量：1个\n' +
            '总计：48.50(元)\n' +
            //'节省：1.00(元)\n' +
            '----------------------';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });

    it('should print correct text', function () {
        spyOn(console, 'log');
        var noFavourableInput = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2',
            'ITEM000004',
            'ITEM000004'
        ];
        printReceipt(noFavourableInput);
        var expectText =
            '***<没钱赚商店>收据***\n' +
            '名称：羽毛球，数量：10个，单价：1.00(元)，小计：9.50(元)，优惠:0.50(元)\n' +
            '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
            '名称：电池，数量：2个，单价：2.00(元)，小计：4.00(元)\n' +
            '批发价出售商品：名称：羽毛球，数量：1个\n' +
            '总计：43.50(元)' +
            '节省：0.50(元)\n' +
            '----------------------';

        expect(console.log).toHaveBeenCalledWith(expectText);
    });
});
