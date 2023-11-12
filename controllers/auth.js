const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

async function register(req, res) {
    const { firstname, lastname, email, password, avatar } = req.body;

    if (!email) return res.status(400).send({ msg: "El email es obligatorio" });
    if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

    const user = new User({
        firstname: firstname,
        lastname: lastname,
        email: email.toLowerCase(),
        password: password,
        active: "false",
        role: "user",
        avatar: avatar
    });
};

module.exports = {
    register,
    login,
};