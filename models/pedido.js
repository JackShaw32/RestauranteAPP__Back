const mongoose = require("mongoose");

const pedidoSchema = mongoose.Schema({
  usuario: String,
  correo: String,
  fecha: { type: Date, default: Date.now },
  confirmado: { type: Boolean, default: false },
  precioFinal: { type: Number, required: true },
  cantidadProductos: { type: Number, required: true },
  idUser: { type: String, required: true },
});

module.exports = mongoose.model("Pedido", pedidoSchema);
