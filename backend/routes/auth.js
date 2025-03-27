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

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password,isAdmin } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user._id}, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = router;
