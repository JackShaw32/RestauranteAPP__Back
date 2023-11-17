const image = require('../utils/getFileName')
const Food = require('../models/food');


async function createFood(req,res){
   const newMovie = new Food(req.body) 
    
    if(req.files.image){
        const imagePath = image.getFileName(req.files.image)
        newMovie.image = imagePath
    } 
    
    try{
        await newMovie.save()
        res.status(200).send({msg: 'Comida guardada en la base de datos'})
    }
    catch(error){
        res.status(400).send({msg: `Error en el servidor: ${error}`})
    }
}

module.exports = {
    createFood,
}