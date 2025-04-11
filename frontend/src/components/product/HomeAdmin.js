import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import axios from 'axios';
import '../../styles/ShowProducts.css'; // Importa los estilos personalizados

const HomeAdmin = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Inicializa el hook de navegación

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/authproduct'); // Obtiene todos los productos
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setError('No se pudo cargar la lista de productos.');
      }
    };

    fetchProducts();
  }, []);

  const handleCreateProduct = () => {
    navigate('/createproduct'); // Redirige a la ruta de creación de productos
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
