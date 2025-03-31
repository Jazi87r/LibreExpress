const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'El nombre del producto es obligatorio'] 
  },
  price: { 
    type: Number, 
    required: [true, 'El precio es obligatorio'], 
    min: [0, 'El precio no puede ser negativo'] 
  },
  stock: { 
    type: Number, 
    required: true, 
    min: [0, 'El stock no puede ser negativo'] 
  },
  description: { type: String },
  category: { type: String },
  imageUrl: { type: String },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Product', productSchema);