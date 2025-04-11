class Cart {
    constructor(items = []) {
        this.items = items;
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    getItems() {
        return this.items;
    }
}

class CartFactory {
    static createCart() {
        return new Cart();
    }
}

module.exports = CartFactory;
