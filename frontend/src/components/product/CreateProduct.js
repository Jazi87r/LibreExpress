import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/CreateProduct.css'; // Importa estilos personalizados

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '', // URL de la imagen
  });
  const [message, setMessage] = useState(null); // Mensaje de éxito o error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita la recarga de la página

    try {
      // Enviar los datos del formulario a la nueva ruta base "/authproduct/create"
      const response = await axios.post('http://localhost:5000/authproduct/create', formData);
      setMessage(response.data.message); // Muestra mensaje de éxito
      setFormData({ name: '', description: '', price: '', stock: '', imageUrl: '' }); // Limpia el formulario
    } catch (error) {
      console.error('Error al crear el producto:', error);
      setMessage('Error al crear el producto.'); // Muestra mensaje de error
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '', price: '', stock: '', imageUrl: '' }); // Limpia el formulario
    setMessage(null); // Limpia el mensaje
  };

  return (
    <div className="create-product-container">
      <h1>Crear Producto</h1>
      {message && (
        <p className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="create-product-form">
        <label>Nombre del Producto:</label>
        <input
          type="text"
          name="name"
          placeholder="Ingrese el nombre del producto"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label>Descripción:</label>
        <textarea
          name="description"
          placeholder="Ingrese una descripción del producto"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        <label>Precio:</label>
        <input
          type="number"
          name="price"
          placeholder="Ingrese el precio del producto"
          value={formData.price}
          onChange={handleInputChange}
          required
        />

        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          placeholder="Ingrese la cantidad en stock"
          value={formData.stock}
          onChange={handleInputChange}
          required
        />

        <label>URL de la Imagen:</label>
        <input
          type="url"
          name="imageUrl"
          placeholder="Ingrese el enlace (URL) de la imagen"
          value={formData.imageUrl}
          onChange={handleInputChange}
          required
        />

        <div className="buttons">
          <button type="submit">Guardar Producto</button>
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
