import React from 'react';
import '../styles/Navbar.css';
import { FaShoppingCart } from 'react-icons/fa'; // Asegúrate de instalar react-icons si no lo tienes.

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Libre Express</h1>
      </div>
      <ul className="nav-links">
        <li><a href="/">Inicio</a></li>
        <li><a href="/products">Productos</a></li>
        <li><div className="cart-icon">
        <FaShoppingCart />
      </div></li>
        <li><a href="/login">Iniciar sesión</a></li>
      </ul>
      
    </nav>
  );
};

export default Navbar;
