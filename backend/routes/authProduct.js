const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Importa el modelo de producto

// Ruta para crear un producto
router.post('/create', async (req, res) => {
  const { name, description, price, stock, imageUrl } = req.body; // Recibe los datos del producto

  try {
    // Crea un nuevo producto en la base de datos
    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      imageUrl, // Almacena el enlace de la imagen
    });

    res.status(201).send({ message: 'Producto creado exitosamente.', product: newProduct });
  } catch (error) {
    res.status(500).send({ message: 'Error al crear el producto.', error });
  }
});

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Recupera todos los productos
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener los productos.', error });
  }
});

// Ruta para obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // Encuentra el producto por ID
    if (!product) {
      return res.status(404).send({ message: 'Producto no encontrado.' });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el producto.', error });
  }
});

// Ruta para actualizar un producto
router.put('/:id', async (req, res) => {
  const { name, description, price, stock, imageUrl } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock, imageUrl },
      { new: true } // Devuelve el producto actualizado
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: 'Producto no encontrado.' });
    }

    res.status(200).send({ message: 'Producto actualizado exitosamente.', product: updatedProduct });
  } catch (error) {
    res.status(500).send({ message: 'Error al actualizar el producto.', error });
  }
});

// Ruta para eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id); // Elimina el producto

    if (!deletedProduct) {
      return res.status(404).send({ message: 'Producto no encontrado.' });
    }

    res.status(200).send({ message: 'Producto eliminado exitosamente.', product: deletedProduct });
  } catch (error) {
    res.status(500).send({ message: 'Error al eliminar el producto.', error });
  }
});

// Ruta para buscar productos por nombre
router.get('/buscar', async (req, res) => {
  const { nombre } = req.query;

  try {
    const productos = await Product.find({
      name: { $regex: nombre, $options: 'i' }, // Búsqueda insensible a mayúsculas
    });

    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar productos.', error });
  }
});


module.exports = router;