import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProfile from './components/user/UserProfile';
import Login from './components/user/Login';
import Register from './components/user/Register';
import HomeAdmin from './components/product/HomeAdmin';
import Home from './components/product/Home';
import ManageUser from './components/user/ManageUser';
import HomeLogin from './components/product/HomeLogin';
import PrivacyPolicy from './components/PrivacyPolicy';
import { AuthProvider } from './context/AuthContext';
import { v4 as uuidv4 } from 'uuid';


function AppContent() {
  const [cartItems, setCartItems] = useState([]);


  
  const handleAddToCart = (product) => {
    const defaultProduct = {
        id: product.id || uuidv4(),
        name: product.name || "Producto genérico",
        description: product.description || "Descripción no disponible",
        price: product.price !== undefined ? product.price : 0,
        quantity: product.quantity !== undefined ? product.quantity : 1,
        stock: product.stock || 0,
        imageUrl: product.imageUrl || "https://via.placeholder.com/150",
    };

    setCartItems([...cartItems, defaultProduct]);

    // Mostrar alerta cuando se agregue un producto
    alert(`¡Producto agregado al carrito!\nNombre: ${defaultProduct.name}\nPrecio: $${defaultProduct.price}\nCantidad: ${defaultProduct.quantity}`);
};

  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeLogin />} />
        <Route path="/home" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home  />} />
        <Route path="/homeadmin" element={<HomeAdmin />} />
        <Route path="/manageuser" element={<ManageUser />} />
        <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
        <Route path="/userprofile" element={<UserProfile />} />

      </Routes>
      <Footer />
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
