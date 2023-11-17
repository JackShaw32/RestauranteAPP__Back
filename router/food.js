const express = require('express')
const multiparty = require('connect-multiparty')
const FoodController = require('../controllers/food')

// Validaciones
const md_upload = multiparty( { uploadDir: './uploads/food'} )

// Cramos nuestras rutas
const api = express.Router();

api.post('/food', [md_upload] ,FoodController.createFood)

module.exports = api