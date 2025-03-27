import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleLogin = async () => {
      try {
         const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
         alert('Inicio de sesión exitoso, token: ' + res.data.token);
      } catch (err) {
         alert('Error en el inicio de sesión: ' + err.response.data.message);
      }
   };

   return (
      <div>
         <h2>Iniciar Sesión</h2>
         <input type="email" placeholder="Correo Electrónico" onChange={(e) => setEmail(e.target.value)} />
         <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
         <button onClick={handleLogin}>Iniciar Sesión</button>
      </div>
   );
};

export default Login;