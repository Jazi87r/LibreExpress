import React, { useState } from 'react';
import axios from 'axios';
import '../styles/register.css'; 
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [username, setUsername] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/register', {
        username,
        cedula,
        telefono,
        password,
      });
      alert(response.data.message); // Muestra un mensaje de éxito
      navigate('/home'); // Ruta para usuarios normales
    } catch (error) {
      alert('Error: ' + error.response.data.error); // Muestra errores
    }
  };

  return (
    <div className="register-container">
      <h1>Registro de Usuario</h1>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Identificación"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default Register;
