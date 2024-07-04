const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Controlador para registrar un usuario
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    user = new User({
      name,
      email,
      password
    });

    await user.save();
    res.status(201).json({ msg: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Controlador para iniciar sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales incorrectas' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales incorrectas' });
    }

    res.json({ msg: 'Inicio de sesión exitoso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};
