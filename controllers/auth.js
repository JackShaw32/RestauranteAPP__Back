const register = (req,res) =>{
    console.log('se ejecuto correctamente')
    res.status(200).send({msg: 'todo ok'})
}

module.exports = {
    register,
}