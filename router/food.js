const express = require('express')
const multiparty = require('connect-multiparty')
const FoodController = require('../controllers/food')

// Validaciones
const md_upload = multiparty( { uploadDir: './uploads/food'} )

// Cramos nuestras rutas
const api = express.Router();

api.post('/food', [md_upload] ,FoodController.createFood)
api.get('/foods' ,FoodController.getFoods)
api.put('/food/:id', [md_upload] ,FoodController.updateFoods)
api.delete('/food/:id' ,FoodController.deleteFoods)

module.exports = api