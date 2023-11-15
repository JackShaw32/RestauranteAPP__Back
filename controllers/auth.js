const User = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('../utils/jwt')

async function register(req, res) {
    const { name, lastName, email, password } = req.body;

    if (!email) return res.status(400).send({ msg: "El email es obligatorio" });
    if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

    const user = new User({
        name: name,
        lastName: lastName,
        email: email.toLowerCase(),
        password: password,
        active: "false",
        role: "user"
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

async function login(req, res){
    const { email, password } = req.body;
    if(!email)res.status(400).send({msg: 'El correo es obligatorio'})
    if(!password)res.status(400).send({msg: 'La contrasenia es obligatoria'})
    
    try{
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            res.status(400).send({ msg: 'Email no encontrado.' });
            return;
        }
        
        const check = await bcrypt.compare(password, user.password);
        if (!check) {
            res.status(400).send({ msg: 'Contraseña incorrecta.' });
            return;
        }     

        if(!user.active){
            res.status(400).send({ msg: 'Usuario no activo' });
            return;
        } else{
            res.status(200).send({ access: jwt.createAccessToken(user) });
        } 
    }
    catch(error){
        res.status(500).send({msg: `Error en el servidor: ${error}`})
    }
}

module.exports = {
    register,
    login,
};