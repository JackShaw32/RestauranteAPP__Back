const User = require('../models/user')

async function getMe(req,res){
    const {user_id} = req.user
    const user = await User.findById(user_id)

    if(!user){
        return res.status(400).send({msg: 'No se ha encontrado al usuario'})
    }else {
        return res.status(200).send(user)
    }
}

module.exports = {
    getMe
}