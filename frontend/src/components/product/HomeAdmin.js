import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/ShowProducts.css';

const HomeAdmin = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/authproduct'); // Endpoint para obtener todos los productos
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setError('No se pudo cargar la lista de productos.');
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = () => {
    navigate('/createproduct'); // Redirigir al formulario de creación
  };

  const handleEditProduct = (productId) => {
    navigate(`/editproduct/${productId}`); // Redirigir al formulario de edición con el ID
  };

  if (error) {
    return (
      <div className="show-products-container">
        <h1>Lista de Productos</h1>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="show-products-container">
      <h1>Lista de Productos</h1>
      <button onClick={handleCreateProduct} className="create-product-button">
        Crear Producto
      </button>
      
      {products.length > 0 ? (
        <table className="products-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                </td>
                <td>
                  <button
                    onClick={() => handleEditProduct(product._id)}
                    className="edit-button"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-products">No hay productos disponibles.</p>
      )}
    </div>
  );
};

export default HomeAdmin;
