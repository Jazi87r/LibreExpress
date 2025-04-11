import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Importar el contexto global

const Logout = () => {
  const { setIsLoggedIn, setIsAdmin, setUsername } = useContext(AuthContext); // Accede al contexto
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem('token'); // Elimina el token del almacenamiento local
      setUsername(''); // Limpia el nombre del usuario
      setIsAdmin(false); // Limpia el estado de admin
      setIsLoggedIn(false); // Actualiza el estado de sesión
      navigate('/'); // Redirige al usuario a la página de inicio de sesión
    };

    handleLogout(); // Ejecuta el cierre de sesión
  }, [setUsername, setIsAdmin, setIsLoggedIn, navigate]);

  return (
    <div>
      <h1>Cerrando sesión...</h1>
    </div>
  );
};

export default Logout;
