// La carpeta utils sirve para hacer funciones que ayudan a mi app. Como por ejemplo las imagenes de los users
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Generar Token
function createAccessToken(user) {
    // fecha de expiracion
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 3);

    // datos del token
    const payload = {
        token_type: "access",
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime(),
    };

    // generar el token
    return jwt.sign(payload, JWT_SECRET_KEY);
};

function decode(token){
    return jwt.decode(token, JWT_SECRET_KEY, true)
}

module.exports = {
    createAccessToken,
    decode
};