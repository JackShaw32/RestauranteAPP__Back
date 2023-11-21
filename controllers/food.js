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

async function getFoods(req, res){
    try{
        const foods = await Food.find()
        res.status(200).send(foods)
    }
    catch(err){
        res.status(400).send({msg: 'Error al obtener las comidas'})
    }
    
}

async function updateFoods(req, res){
    const {id} = req.params;
    // Los datos que voy a actualizar
    const foodData  = req.body

    if(req.files.images){
        const imagePath = image.getFileName(req.files.image)
        foodData.image = imagePath
    }

    try{
        await Food.findByIdAndUpdate({_id: id}, foodData)
        res.status(200).send({msg: 'Se actualizo correctamente'})
    }
    catch(err){
        res.status(400).send({msg: 'Error al actualizar la informacion'})
    }
}

async function deleteFoods(req, res){
    const {id} = req.params;
    try{
        await Food.findByIdAndDelete(id)
        res.status(200).send({msg: 'Se elimino la comida'})
    }
    catch(error){
        res.status(400).send({msg: 'Error al aliminar la comida'})
    }
}

module.exports = {
    createFood,
    getFoods,
    updateFoods,
    deleteFoods,
}