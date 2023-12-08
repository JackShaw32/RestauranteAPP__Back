const express = require("express");
const UserController = require("../controllers/user");
const md_auth = require("../middlewares/authenticated");

// Cramos nuestras rutas
const api = express.Router();

api.put("/users/:user_id/status", UserController.updateUserStatus);
api.get("/user/me", [md_auth.asureAuth], UserController.getMe);
api.get("/users", UserController.getUsers);

module.exports = api;
