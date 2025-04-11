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

    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '7d' });
    res.json({ token, userType }); // Incluye el tipo de usuario en la respuesta
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});





// Endpoint para obtener todos los usuarios y verificar propiedades
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username cedula telefono isAdmin'); // Selecciona los campos necesarios
    res.status(200).json(users); // Devuelve los datos en formato JSON
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los datos de la base de datos' });
  }
});

router.put('/update-user/:id', async (req, res) => {
  const { id } = req.params;
  const { username, cedula, telefono } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.username = username || user.username;
    user.cedula = cedula || user.cedula;
    user.telefono = telefono || user.telefono;

    await user.save();
    res.status(200).json({ message: 'Usuario actualizado correctamente', user });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

router.get('/user-profile', async (req, res) => {
  const token = req.headers.authorization; // Obtener token del encabezado de la solicitud

  try {
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, 'secretKey'); // Decodificar el token
    const user = await User.findById(decoded.id); // Buscar el usuario por ID en el token

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({
      username: user.username,
      isAdmin: user.isAdmin, // Devuelve si el usuario es administrador
    });
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ error: 'Error al obtener los datos del usuario' });
  }
});



// Endpoint para obtener la información del usuario autenticado
router.get('/user-info', async (req, res) => {
  const token = req.headers.authorization; // Obtener el token del encabezado

  try {
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    // Decodificar el token
    const decoded = jwt.verify(token, 'secretKey');
    const user = await User.findById(decoded.id); // Buscar usuario por ID

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user); // Devuelve toda la información del usuario
  } catch (error) {
    console.error('Error al obtener información del usuario:', error);
    res.status(500).json({ error: 'Error al obtener los datos del usuario' });
  }
});

router.put('/update-user', async (req, res) => {
  const token = req.headers.authorization; // Obtener el token
  const { username, cedula, telefono } = req.body; // Datos que se desean actualizar

  try {
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, 'secretKey'); // Decodificar el token
    const user = await User.findById(decoded.id); // Buscar usuario por ID

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar los datos proporcionados
    user.username = username || user.username;
    user.cedula = cedula || user.cedula;
    user.telefono = telefono || user.telefono;

    await user.save();
    res.status(200).json({ message: 'Usuario actualizado correctamente', user });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar los datos del usuario' });
  }
});

router.delete('/delete-user/:id', async (req, res) => {
  try {
    const userId = req.params.id; // Obtener el ID del usuario
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send({ message: 'Usuario no encontrado.' });
    }
    res.status(200).send({ message: 'Usuario eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error.message);
    res.status(500).send({ message: 'Error al eliminar el usuario.' });
  }
});

module.exports = router;


