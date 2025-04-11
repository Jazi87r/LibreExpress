
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const authProduct = require('./routes/authProduct');
const cartController = require('./controllers/cartController');
const commentController = require('./controllers/commentController');
const orderController = require('./controllers/orderController');

const app = express();

// Conectar a MongoDB
connectDB();


// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/authproduct', authProduct);


// Rutas del carrito
app.get('/cart', cartController.getCartItems);
app.post('/cart', cartController.createCart);
app.delete('/cart/:id', cartController.deleteCartItem);

app.get('/comments/:productId', commentController.getComments);
app.post('/comments/:productId', commentController.addComment);

// Rutas de Orden 

app.post('/orders', orderController.createOrder);
app.get('/orders', orderController.getOrders);



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
