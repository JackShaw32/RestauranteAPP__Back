const jwt = require('../utils/jwt')

function asureAuth(req, res, next){
    const token = req.headers.authorization.replace('Bearer ', '')
    if(!req.headers.authorization){
        res.status(403).send({msg:'La peticion no tiene la cabecera' })
    }

    try{
        const payload = jwt.decode(token)
        const { exp } = payload
        const currentDate = new Date().getTime()
        if(exp <= currentDate ){
            return res.status(400).send({msg: 'El token ha expirado'})
        }

        req.user = payload
        next()
    }
    catch(error){
        return res.status(400).send({msg: 'Token no valido'})
    }
}

module.exports = {
    asureAuth
}