import React, { useEffect, useState } from 'react';
import '../../styles/UserProfile.css';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null); // Información del usuario
  const [formData, setFormData] = useState({ username: '', cedula: '', telefono: '' }); // Formulario
  const [message, setMessage] = useState(null); // Mensaje de éxito o error

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token almacenado
        const response = await axios.get('http://localhost:5000/auth/user-info', {
          headers: {
            Authorization: token, // Enviar el token en el encabezado
          },
        });
        setUser(response.data); // Guarda la información del usuario
        setFormData({
          username: response.data.username,
          cedula: response.data.cedula,
          telefono: response.data.telefono,
        }); // Rellena el formulario con los datos actuales
      } catch (error) {
        console.error('Error al obtener información del usuario:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token
      const response = await axios.put('http://localhost:5000/auth/update-user', formData, {
        headers: {
          Authorization: token,
        },
      });
      setMessage(response.data.message); // Mensaje de éxito
      setUser(response.data.user); // Actualiza la información del usuario en la interfaz
    } catch (error) {
      console.error('Error al actualizar información:', error);
      setMessage('Error al actualizar el usuario.');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token'); // Obtener el token
      await axios.delete('http://localhost:5000/auth/delete-user', {
        headers: {
          Authorization: token,
        },
      });
      alert('Cuenta eliminada exitosamente.');
      localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
      window.location.href = '/'; // Redirigir al usuario a la página principal
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
      setMessage('Error al eliminar la cuenta.');
    }
  };

  return (
    <div className="user-profile-container">
      {user ? (
        <div>
          <h1>Perfil del Usuario</h1>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Cédula:</strong> {user.cedula}</p>
          <p><strong>Teléfono:</strong> {user.telefono}</p>
  
          <h2>Editar Perfil</h2>
          <input
            type="text"
            name="username"
            placeholder="Nuevo Usuario"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cedula"
            placeholder="Nueva Cédula"
            value={formData.cedula}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="telefono"
            placeholder="Nuevo Teléfono"
            value={formData.telefono}
            onChange={handleInputChange}
          />
          <button onClick={handleUpdate}>Actualizar Perfil</button>
          <button onClick={handleDelete} className="delete-button">Eliminar Cuenta</button>
          {message && <p className={message.includes('Error') ? 'error-message' : 'success-message'}>
            {message}
          </p>}
        </div>
      ) : (
        <p className="loading-message">Cargando información del usuario...</p>
      )}
    </div>
  );
};

export default UserProfile;
