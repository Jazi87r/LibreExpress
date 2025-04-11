const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  imageUrl: {
    type: String,
    required: true,
    maxlength: 1000, // Limita el número máximo de caracteres
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/i.test(v); // Valida cualquier URL que comience con http o https
      },
      message: 'Debe ser una URL válida.',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now, // Guarda la fecha de creación automáticamente
  },
});

module.exports = mongoose.model('Product', productSchema);