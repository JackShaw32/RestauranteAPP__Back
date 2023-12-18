const Pedido = require("../models/pedido");

// Funcion para crear el pedido
async function createRequest(req, res) {
  const pedido = new Pedido({
    usuario: req.body.usuario,
    correo: req.body.correo,
    fecha: new Date(req.body.fecha),
    confirmado: req.body.confirmado,
    precioFinal: req.body.precioFinal,
    cantidadProductos: req.body.cantidadProductos,
    idUser: req.body.idUser,
  });

  try {
    await pedido.save();
    res.status(200).send({ msg: "Pedido guardado en la base de datos" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: `Error en el servidor: ${error.message}` });
  }
}

async function getRequests(req, res) {
  try {
    const requests = await Pedido.find();
    res.status(200).send(requests);
  } catch (err) {
    res.status(400).send({ msg: "Error al obtener los pedidos" });
  }
}

async function getUserRequests(req, res) {
  const { user_id } = req.params;

  try {
    const idUsuario = user_id;

    const userRequests = await Pedido.find({ idUser: idUsuario });

    if (userRequests.length === 0) {
      return res
        .status(404)
        .json({ msg: "No se encontraron pedidos para este usuario" });
    }

    // Aquí no deberías enviar nada más después de esta línea
    res.status(200).json(userRequests);
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    // En caso de error, solo debes enviar una respuesta
    return res.status(500).send({ msg: "Error en el servidor", error });
  }
}

// Nueva función para actualizar el estado del pedido
async function updateRequestStatus(req, res) {
  const { request_id } = req.params;
  const { confirmado: newStatus } = req.body;
  try {
    const updatedRequest = await Pedido.findByIdAndUpdate(
      request_id,
      { confirmado: newStatus },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).send({ msg: "No se ha encontrado el pedido" });
    }
    res.status(200).send(updatedRequest);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ msg: "Error al actualizar el estado del pedido", err });
  }
}

module.exports = {
  createRequest,
  updateRequestStatus,
  getRequests,
  getUserRequests,
};
