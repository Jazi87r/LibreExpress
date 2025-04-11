import React, { useState } from 'react';
import '../../styles/cart.css';

    // Calcular el número total de productos
    const Cart = ({ items, onRemoveFromCart, onIncreaseQuantity, onDecreaseQuantity, onCheckout }) => {
        const totalPrice = items.reduce(
            (total, item) => total + (item.price || 0) * (item.quantity || 1),
            0
        );
    
        const totalItems = items.reduce((count, item) => count + (item.quantity || 1), 0);
    
        return (
            <div className="cart-container">
            <h1 className="cart-title">Carrito de Compras</h1>
            <h2 className="cart-summary">Productos en el carrito: {totalItems}</h2>
            <ul className="cart-items">
                {items.map(item => (
                    <li key={item.id} className="cart-item">
                        <div className="item-details">
                            <span className="item-name">{item.name}</span> - ${item.price} x {item.quantity}
                        </div>
                        <div className="item-actions">
                            <button className="action-button" onClick={() => onIncreaseQuantity(item.id)}>Aumentar</button>
                            <button className="action-button" onClick={() => onDecreaseQuantity(item.id)}>Disminuir</button>
                            <button className="action-button danger" onClick={() => onRemoveFromCart(item.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
                </ul>
                <h2 className="cart-total">Total: ${totalPrice.toFixed(2)}</h2>
                <button onClick={() => onCheckout(items, totalPrice)}>
                    Pagar
                </button>
            </div>
        );
    };
    
    export default Cart;
    