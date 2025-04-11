import React, { useContext, useEffect, useState } from 'react';
import '../styles/Navbar.css';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa'; // Ícono del carrito
import { Link, useNavigate } from 'react-router-dom'; // Navegación interna
import { AuthContext } from '../context/AuthContext'; // Importa el contexto

const Navbar = () => {
  const { isLoggedIn, isAdmin, setUsername } = useContext(AuthContext); // Contexto global
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Menú desplegable
  
  const navigate = useNavigate(); // Navegación programática

  // Obtén el perfil del usuario y la cantidad de productos del carrito
  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return; // No hacer nada si no hay token

        // Obtener el perfil del usuario
        const profileResponse = await axios.get('http://localhost:3000/auth/user-profile', {
          headers: { Authorization: token },
        });
        setUsername(profileResponse.data.username);

        // Obtener la cantidad de productos en el carrito
        
      
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchNavbar();
  }, [setUsername]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleEditProfile = () => {
    navigate('/userprofile'); // Navegación al perfil
  };

  // Navbar para administradores
  if (isLoggedIn && isAdmin) {
    return (
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="Logo" /> {/* Logo */}
          <h1>Panel de Administración</h1>
        </div>
        <ul className="nav-links">
          <li><Link to="/buscar">Buscar</Link></li>
          <li><Link to="/homeadmin">Dashboard</Link></li>
          <li><Link to="/manageuser">Usuarios</Link></li>
          <li><Link to="/orders">Reportes</Link></li>
          <li>
            <div className="profile-section" onClick={toggleDropdown}>
              Admin
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li onClick={handleEditProfile}>Editar Perfil</li>
                    <li><Link to="/admin/settings">Configuración</Link></li>
                    <li><Link to="/logout">Cerrar Sesión</Link></li>
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    );
  }

  // Navbar para usuarios regulares
  if (isLoggedIn) {
    return (
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <h1>Libre Express</h1>
        </div>
        <ul className="nav-links">
          <li><Link to="/home">Productos</Link></li>
          <li>
            <div className="cart-icon" onClick={() => navigate('/cart')}>
              <FaShoppingCart />
            </div>
          </li>
          <li>
            <div className="profile-section" onClick={toggleDropdown}>
              Opciones
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li onClick={handleEditProfile}>Editar Perfil</li>
                    <li><Link to="/orderuser">Mis Órdenes</Link></li>
                    <li><Link to="/settings">Configuración</Link></li>
                    <li><Link to="/logout">Cerrar Sesión</Link></li>
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    );
  }

  // Navbar para usuarios no logueados
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
        <h1>Libre Express</h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Iniciar Sesión</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
