
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const authProduct = require('./routes/authProduct');

const app = express();

// Conectar a MongoDB
connectDB();

app.use('/authproduct', authProduct);

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
