import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/ProductView.css'; // Archivo de estilos personalizado
import { useNavigate } from 'react-router-dom';

const HomeLogin = () => {
   const [products, setProducts] = useState([]); // Productos obtenidos del backend
    const [error, setError] = useState(null); // Manejo de errores
      const navigate = useNavigate();
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:5000/authproduct'); // Endpoint para obtener productos
          setProducts(response.data);
        } catch (error) {
          console.error('Error al obtener los productos:', error);
          setError('Error al cargar los productos. Inténtalo de nuevo más tarde.');
        }
      };
  
      fetchProducts();
    }, []);

    const handleLogin = () => {
        navigate('/login'); // Redirige al registro
      };
  
  return (
    <div className="product-view-container">
      
      {/* Sección principal de productos */}
      <main className="product-list">
        <h1>Productos</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">${product.price.toFixed(2)}</p>
              
              <button onClick={handleLogin} className="add-to-cart">Agregar al Carrito</button>
            </div>
          ))}
        </div>
        {products.length === 0 && !error && (
          <p className="no-products">No hay productos disponibles.</p>
        )}
      </main>
    </div>
  );
};

export default HomeLogin;
