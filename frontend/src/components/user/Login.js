import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../../styles/login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [usernameInput, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');
    const { setIsLoggedIn, setIsAdmin, setUsername, setUserId } = useContext(AuthContext); // Usar el contexto
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                username: usernameInput,
                password,
            });

            const token = response.data.token;
            const userType = response.data.userType; // Tipo de usuario
            const userId = response.data.userId; // ID del usuario

            // Guardar el token en localStorage
            localStorage.setItem('token', token);

            // Actualizar el contexto global
            setIsLoggedIn(true);
            setUsername(response.data.username);
            setUserId(userId);
            setIsAdmin(userType === 'admin');

            // Redirigir al usuario según su tipo
            userType === 'admin' ? navigate('/homeadmin') : navigate('/home');
        } catch (error) {
            alert('Error: ' + (error.response?.data?.error || 'Error desconocido'));
        }
    };

    const handleRegister = () => {
        navigate('/register'); // Redirigir al registro
    };

    return (
        <div className="loginContainer">
            <h1 className="title">Iniciar Sesión</h1>
            <input
                className="camtex"
                type="text"
                placeholder="Usuario"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
            />
            <input
                className="camtex"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin} className="loginButton">
                Iniciar sesión
            </button>
            <button onClick={handleRegister} className="registerButton">
                Regístrate
            </button>
        </div>
    );
};

export default Login;
