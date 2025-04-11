import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/ProductDetails.css'; // Importar estilos separados

const ProductDetails = ({ onAddToCart }) => {
    const { productId } = useParams(); // Obtener el ID del producto desde la URL
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1); // Estado para controlar la cantidad
    const [comments, setComments] = useState([]); // Estado para comentarios
    const [newComment, setNewComment] = useState(''); // Estado para el comentario nuevo

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/authproduct/${productId}`); // Endpoint para detalle
                setProduct(response.data);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
                setError('No se pudo cargar el detalle del producto.');
            }
        };

        fetchProductDetails();
    }, [productId]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/comments/${productId}`); // Endpoint para comentarios
                setComments(response.data);
            } catch (error) {
                console.error('Error al obtener comentarios:', error);
                setError('No se pudieron cargar los comentarios.');
            }
        };

        fetchComments();
    }, [productId]);

    const handleAddComment = async () => {
        if (!newComment) {
            alert('Por favor, escribe un comentario.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/comments/${productId}`, {
                comment: newComment,
            }); // Enviar el comentario al servidor
            setComments([...comments, response.data]); // Actualizar la lista de comentarios
            setNewComment(''); // Limpiar el campo de texto
        } catch (error) {
            console.error('Error al agregar el comentario:', error);
            alert('No se pudo agregar el comentario.');
        }
    };

    const handleIncreaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        } else {
            alert("No hay suficiente stock disponible.");
        }
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!product) {
        return <p className="loading">Cargando...</p>;
    }

    return (
        <div className="product-details-container">
            <div className="product-image-container">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
            </div>
            <div className="product-info-container">
                <h1 className="product-title">{product.name}</h1>
                <p className="product-description">{product.description}</p>
                <p className="product-price"><strong>Precio: </strong>${product.price.toFixed(2)}</p>
                <p className="product-stock"><strong>Stock disponible: </strong>{product.stock}</p>

                <div className="quantity-control">
                    <button className="quantity-button" onClick={handleDecreaseQuantity}>-</button>
                    <span className="quantity">{quantity}</span>
                    <button className="quantity-button" onClick={handleIncreaseQuantity}>+</button>
                </div>

                <button
                    className="add-to-cart-button"
                    onClick={() => onAddToCart({ ...product, quantity })}
                >
                    Agregar al Carrito
                </button>
            </div>

            {/* Opiniones  */}
            <div className="comments-container">
                <h2>Opiniones</h2>
                <ul className="comments-list">
                    <li>User</li>
                    {comments.map((comment, index) => (
                        <li key={index} className="comment">{comment.comment}</li>
                    ))}
                </ul>
                <div className="add-comment">
                    <textarea
                        className="textarea"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escribe tu comentario..."
                    ></textarea>
                    <button className="add-comment-button" onClick={handleAddComment}>
                        Agregar Comentario
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
