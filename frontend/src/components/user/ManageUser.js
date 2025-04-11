import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/manageUser.css';

const ManageUser = () => {
  const [users, setUsers] = useState([]); // Lista de usuarios
  const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado para editar
  const [formData, setFormData] = useState({ username: '', cedula: '', telefono: '', isAdmin: false }); // Formulario de edición
  const [message, setMessage] = useState(null); // Mensaje de éxito o error

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/users'); // Endpoint para obtener usuarios
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user); // Asigna el usuario seleccionado
    setFormData({
      username: user.username,
      cedula: user.cedula,
      telefono: user.telefono,
      isAdmin: user.isAdmin, // Incluye el atributo isAdmin
    });
  };

  const handleCancel = () => {
    setSelectedUser(null); // Cierra el formulario sin guardar cambios
    setMessage('Edición cancelada.'); // Mensaje informativo
  };

  const handleInputChange = (e) => {
    const value =
      e.target.name === 'isAdmin' ? e.target.checked : e.target.value; // Maneja el checkbox para isAdmin
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/auth/update-user/${selectedUser._id}`, formData);
      setMessage(response.data.message);

      // Actualiza la lista de usuarios en el estado
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === selectedUser._id ? { ...user, ...formData } : user
        )
      );

      setSelectedUser(null); // Cierra el formulario
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      setMessage('Error al actualizar el usuario.');
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/auth/delete-user/${userId}`); // Eliminar usuario
      setMessage('Usuario eliminado exitosamente.');

      // Actualizar la lista de usuarios
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      setMessage('Error al eliminar el usuario.');
    }
  };

  return (
    <div className="manage-user-container">
      <h1>Panel de Administración</h1>
      {message && <p style={{ color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}

      <div>
        <h2>Usuarios</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Administrador</th>
              <th>Nombre de Usuario</th>
              <th>Cédula</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.isAdmin ? 'Sí' : 'No'}</td>
                <td>{user.username}</td>
                <td>{user.cedula}</td>
                <td>{user.telefono}</td>
                <td>
                  <button onClick={() => handleEditClick(user)} className="edit-button">Editar</button>
                  <button onClick={() => handleDeleteUser(user._id)} className="delete-button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="edit-user-form">
          <h2>Editar Usuario</h2>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            value={formData.cedula}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleInputChange}
          />
          <label>
            <input
              type="checkbox"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleInputChange}
            />
            Administrador
          </label>
          <button onClick={handleUpdate}>Guardar Cambios</button>
          <button onClick={handleCancel}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
