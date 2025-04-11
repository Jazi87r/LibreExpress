import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Cart from './components/cart/Cart';import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserProfile from './components/user/UserProfile';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Logout from './components/user/Logout';
import CreateProduct from './components/product/CreateProduct';
import HomeAdmin from './components/product/HomeAdmin';
import Home from './components/product/Home';
import Orders from './components/cart/Orders';
import ManageUser from './components/user/ManageUser';
import ProductDetails from './components/product/ProductDetails';
import HomeLogin from './components/product/HomeLogin';
import PrivacyPolicy from './components/PrivacyPolicy';
import { AuthProvider } from './context/AuthContext';
import { v4 as uuidv4 } from 'uuid';


function AppContent() {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState(null); // Estado para almacenar datos del usuario

  useEffect(() => {
      const fetchUserData = async () => {
          try {
              const token = localStorage.getItem('token'); // Obtener el token de sesión
              const response = await axios.get('http://localhost:3000/auth/user-info', {
                  headers: { Authorization: token },
              });
              setUserData(response.data); // Guardar la información del usuario en el estado
          } catch (error) {
              console.error('Error al obtener datos del usuario:', error);
          }
      };

      fetchUserData();
  }, []);

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


  const handleCheckout = (items, totalPrice) => {
      if (!userData) {
          alert("Por favor, inicia sesión para completar la compra.");
          return;
      }

      const orderData = {
          userId: userData.cedula, // Usar la cédula como ID del usuario
          userName: userData.username, // Usar el nombre del usuario
          items,
          totalPrice,
      };

      fetch('http://localhost:5000/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
      })
          .then((response) => {
              if (response.ok) {
                  return response.json();
              } else {
                  throw new Error(`Error al procesar el pago: ${response.status}`);
              }
          })
          .then((data) => {
              alert(data.message || "Orden creada exitosamente.");
              setCartItems([]);
          })
          .catch((error) => {
              alert("Hubo un problema al procesar el pago.");
          });
  };

  useEffect(() => {
      const fetchOrders = async () => {
          try {
              const response = await fetch('http://localhost:5000/orders');
              if (response.ok) {
                  const data = await response.json();
                  setOrders(data);
              } else {
                  console.error("Error al obtener las órdenes:", response.status);
              }
          } catch (error) {
              console.error("Error al conectarse al servidor:", error);
          }
      };

      fetchOrders();
  }, []);


  return (



    <Router>
      <Navbar />
      <Routes>
        
      <Route
                  path="/cart"
                  element={
                      <Cart
                          items={cartItems}
                          onRemoveFromCart={(productId) => setCartItems(cartItems.filter((item) => item.id !== productId))}
                          onIncreaseQuantity={(productId) =>
                              setCartItems(cartItems.map((item) =>
                                  item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                              ))
                          }
                          onDecreaseQuantity={(productId) =>
                              setCartItems(cartItems.map((item) =>
                                  item.id === productId && item.quantity > 1
                                      ? { ...item, quantity: item.quantity - 1 }
                                      : item
                              ))
                          }
                          onCheckout={handleCheckout}
                      />
                  }
              />
        
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeLogin />} />
        <Route path="/home" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home  />} />
        <Route path="/homeadmin" element={<HomeAdmin />} />
        <Route path="/manageuser" element={<ManageUser />} />
        <Route path="/orders" element={<Orders orders={orders} />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/product/:productId" element={<ProductDetails onAddToCart={handleAddToCart} />} />
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
