const Order = require('../models/orderModel');

// Crear una nueva orden
exports.createOrder = async (req, res) => {
    const { userId, userName, items, totalPrice } = req.body;

    // Validar que los datos enviados son correctos
    if (!userId || !userName) {
        return res.status(400).json({ message: "Faltan datos del usuario." });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "El carrito está vacío o los datos son inválidos." });
    }
    if (!totalPrice || typeof totalPrice !== 'number') {
        return res.status(400).json({ message: "El total enviado no es válido." });
    }

    // Validar cada producto en "items"
    for (let item of items) {
        if (!item.id || !item.name || !item.price || !item.quantity) {
            return res.status(400).json({
                message: `El producto con ID ${item.id || "desconocido"} tiene datos incompletos.`
            });
        }
    }

    try {
        const newOrder = new Order({ userId, userName, items, totalPrice });
        await newOrder.save();
        res.status(201).json({ message: "Orden creada exitosamente." });
    } catch (error) {
        console.error("Error al crear la orden:", error.message);
        res.status(500).json({ message: "Error interno al crear la orden." });
    }
};

// Obtener todas las órdenes
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }); // Obtener órdenes y ordenarlas por fecha (más reciente primero)
        res.status(200).json(orders); // Responder con las órdenes en formato JSON
    } catch (error) {
        console.error("Error al obtener las órdenes:", error.message);
        res.status(500).json({ message: "Error al obtener las órdenes." });
    }
};
