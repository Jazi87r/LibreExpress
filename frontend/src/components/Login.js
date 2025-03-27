import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css'; 
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });

      
      alert('Inicio de sesión exitoso. ');
      navigate('/home'); // Redirige según el tipo de usuario
    } catch (error) {
      alert('Error: ' + error.response.data.error);
    }
  };

  const handleRegister = async () => {
    navigate('/register'); // Redirige a registro
  };

  return (
    <div className="loginContainer">
      <h1 className='title'> Iniciar Sesión</h1>
      <input className='camtex'
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input className='camtex'
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}className='loginButton' >Iniciar sesión</button>
      <button onClick={handleRegister} className='registerButton'>Registrate</button>
    </div>
  );
};

export default Login;
