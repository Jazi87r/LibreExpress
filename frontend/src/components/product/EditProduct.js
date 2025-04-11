import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/EditProduct.css';

const EditProduct = () => {
  const { productId } = useParams(); // Obtener el ID del producto desde la URL
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/authproduct/${productId}`); // Obtener los detalles del producto
        setProduct(response.data);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
        setError('No se pudo cargar los detalles del producto.');
      }
    };

    fetchProduct();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/authproduct/${productId}`, product); // Actualizar el producto
      alert('Producto actualizado exitosamente.');
      navigate('/homeadmin'); // Redirigir al listado de productos
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      setError('No se pudo actualizar el producto.');
    }
  };

  const handleDeleteProduct = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/authproduct/${productId}`); // Eliminar el producto
      alert('Producto eliminado exitosamente.');
      navigate('/homeadmin'); // Redirigir al listado de productos
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      setError('No se pudo eliminar el producto.');
    }
  };

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="edit-product-container">
      <h1>Editar Producto</h1>
      <form onSubmit={handleUpdateProduct} className="edit-product-form">
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </label>
        <label>
          Precio:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Imagen URL:
          <input
            type="text"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="update-button">
          Actualizar Producto
        </button>
      </form>
      <button onClick={handleDeleteProduct} className="delete-button">
        Eliminar Producto
      </button>
    </div>
  );
};

export default EditProduct;
