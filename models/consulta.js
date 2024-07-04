const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true },
  detallesServicio: { type: String, required: true },
  fechaPreferida: { type: Date, required: true },
  horaPreferida: { type: String, required: true },
  telefonoContacto: { type: String, required: true },
  metodoContacto: { type: String, enum: ['correo', 'telefono'], required: true },
  comentarios: String
});

module.exports = mongoose.model('Consulta', consultaSchema);
