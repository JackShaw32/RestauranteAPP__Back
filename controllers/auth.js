const User = require("../models/user");
const bcrypt = require('bcrypt')

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

    // encriptar la pass
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    user.password = hashPassword

    try{
        await user.save()
        res.status(200).send({msg: 'Usuario guardado'})
    }
    catch(error){
        res.status(400).send({msg: `Error al guardar los datos: ${error}`})
    }
};

module.exports = {
    register,
};