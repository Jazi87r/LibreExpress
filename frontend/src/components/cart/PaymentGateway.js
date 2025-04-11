import React, { useState } from 'react';
import '../../styles/paymentGateway.css'; // Archivo CSS externo para la pasarela de pago

const PaymentGateway = ({ totalPrice, onCompletePayment }) => {
    const [selectedMethod, setSelectedMethod] = useState('');

    const handlePayment = () => {
        if (!selectedMethod) {
            alert('Por favor, selecciona un método de pago.');
            return;
        }
        alert(Pago realizado con éxito utilizando ${selectedMethod}.);
        onCompletePayment(); // Callback para finalizar el pago y limpiar el carrito
    };

    return (
        <div className="payment-gateway-container">
            <h1 className="payment-title">Pasarela de Pago</h1>
            <h2 className="payment-summary">Total a pagar: ${totalPrice.toFixed(2)}</h2>
            <div className="payment-methods">
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="Tarjeta de crédito"
                        onChange={(e) => setSelectedMethod(e.target.value)}
                    />
                    Tarjeta de crédito
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="PayPal"
                        onChange={(e) => setSelectedMethod(e.target.value)}
                    />
                    PayPal
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="Efectivo"
                        onChange={(e) => setSelectedMethod(e.target.value)}
                    />
                    Efectivo
                </label>
            </div>
            <button className="payment-button" onClick={handlePayment}>
                Confirmar Pago
            </button>
        </div>
    );
};

export default PaymentGateway;
