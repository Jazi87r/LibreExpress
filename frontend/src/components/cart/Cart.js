import React, { useState } from 'react';
import PaymentGateway from './PaymentGateway'; // Importar la pasarela de pago
import '../../styles/cart.css';

const Cart = ({ items, onRemoveFromCart, onIncreaseQuantity, onDecreaseQuantity, onCheckout }) => {
    const totalPrice = items.reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 1),
        0
    );

    const totalItems = items.reduce((count, item) => count + (item.quantity || 1), 0);

    const [showPaymentGateway, setShowPaymentGateway] = useState(false);

    const handleCompletePayment = () => {
        setShowPaymentGateway(false);
        onCheckout(items, totalPrice); // Llamar a la función de checkout
    };

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
            {!showPaymentGateway ? (
                <button className="checkout-button" onClick={() => setShowPaymentGateway(true)}>
                    Pagar
                </button>
            ) : (
                <PaymentGateway totalPrice={totalPrice} onCompletePayment={handleCompletePayment} />
            )}
        </div>
    );
};

export default Cart;