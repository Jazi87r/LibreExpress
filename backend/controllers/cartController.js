const CartFactory = require('../factories/cartFactory');

const cart = CartFactory.createCart();

// Obtener elementos del carrito
exports.getCartItems = (req, res) => {
    res.json(cart.getItems());
};

// Agregar un elemento al carrito
exports.createCart = (req, res) => {
    const item = req.body;
    cart.addItem(item);
    res.status(201).send("Producto agregado");
};

// Eliminar un elemento del carrito
exports.deleteCartItem = (req, res) => {
    const itemId = req.params.id;
    cart.removeItem(itemId);
    res.send("Producto eliminado");
};
