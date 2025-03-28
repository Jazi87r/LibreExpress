const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { username,cedula,telefono, password } = req.body;
  try {
    const newUser = new User({ username,cedula,telefono, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

//inicio de sesion
router.post('/login', async (req, res) => {
  const { username, password } = req.body; // No necesitas 'isAdmin' aquí, se consulta en la base de datos
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    // Devuelve también si el usuario es admin
    const userType = user.isAdmin ? 'admin' : 'user'; // Suponiendo que 'isAdmin' es parte del modelo User

    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
    res.json({ token, userType }); // Incluye el tipo de usuario en la respuesta
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;
