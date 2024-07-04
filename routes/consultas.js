const express = require('express');
const router = express.Router();
const Consulta = require('../models/consulta'); // Asegúrate de que la ruta al modelo es correcta

// POST para crear una nueva consulta
router.post('/consultas', async (req, res) => {
  try {
    const { nombre, correo, detallesServicio, fechaPreferida, horaPreferida, telefonoContacto, metodoContacto, comentarios } = req.body;
    let consulta = new Consulta({
      nombre,
      correo,
      detallesServicio,
      fechaPreferida,
      horaPreferida,
      telefonoContacto,
      metodoContacto,
      comentarios
    });
    await consulta.save();
    res.status(201).send(consulta);
  } catch (error) {
    res.status(400).send({ message: "Error al crear la consulta", error });
  }
});

// GET para obtener todas las consultas
router.get('/consultas', async (req, res) => {
    try {
      const consultas = await Consulta.find();
      res.status(200).send(consultas);
    } catch (error) {
      res.status(500).send({ message: "Error al obtener las consultas", error });
    }
  });

// GET para obtener una consulta específica por ID
router.get('/consultas/:id', async (req, res) => {
  try {
    const consulta = await Consulta.findById(req.params.id);
    if (!consulta) {
      return res.status(404).send({ message: "Consulta no encontrada" });
    }
    res.status(200).send(consulta);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener la consulta", error });
  }
});

// PATCH para actualizar una consulta específica por ID
router.patch('/consultas/:id', async (req, res) => {
  try {
    const consulta = await Consulta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!consulta) {
      return res.status(404).send({ message: "Consulta no encontrada" });
    }
    res.status(200).send(consulta);
  } catch (error) {
    res.status(500).send({ message: "Error al actualizar la consulta", error });
  }
});

// DELETE para borrar una consulta específica por ID
router.delete('/consultas/:id', async (req, res) => {
  try {
    const consulta = await Consulta.findByIdAndDelete(req.params.id);
    if (!consulta) {
      return res.status(404).send({ message: "Consulta no encontrada" });
    }
    res.status(200).send({ message: "Consulta eliminada" });
  } catch (error) {
    res.status(500).send({ message: "Error al eliminar la consulta", error });
  }
});

module.exports = router;
