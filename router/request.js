const express = require("express");
const RequestController = require("../controllers/request");

const api = express.Router();

// Ruta para guardar el pedido en el back
api.post("/requests", RequestController.createRequest);
api.put("/requests/:request_id/status", RequestController.updateRequestStatus);
api.get("/request", RequestController.getRequests);
api.get("/user/:user_id/requests", RequestController.getUserRequests);

module.exports = api;
