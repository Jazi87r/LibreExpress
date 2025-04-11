import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/ProductView.css'; // Archivo de estilos personalizado

const Home = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]); // Estado para almacenar productos
    const [error, setError] = useState(null); // Estado para manejar errores

    // Obtener datos desde la API en MongoDB
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/authproduct'); // Endpoint de tu API
                setProducts(response.data); // Actualizar productos
            } catch (error) {
                console.error('Error al obtener los productos:', error);
                setError('Error al cargar los productos. Inténtalo de nuevo más tarde.');
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-view-container">
            {/* Panel lateral: Filtros */}
            <aside className="filter-panel">
                <h2>Filtros</h2>
                <div className="filter-group">
                    <label htmlFor="brand">Marca:</label>
                    <select id="brand">
                        <option value="">Todas</option>
                        <option value="Nike">Nike</option>
                        <option value="Adidas">Adidas</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="priceRange">Precio:</label>
                    <input type="range" id="priceRange" min="0" max="1000" step="50" />
                </div>
                <div className="filter-group">
                    <input type="checkbox" id="inStock" />
                    <label htmlFor="inStock">Solo disponibles</label>
                </div>
            </aside>

            {/* Lista de productos */}
            <main className="product-list">
                <h1>Productos</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            <Link to={`/product/${product._id}`}>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="product-image"
                                />
                            </Link>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="price">${product.price.toFixed(2)}</p>
                            <button onClick={() => onAddToCart(product)} className="add-to-cart">
                                Agregar al Carrito
                            </button>
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

export default Home;
