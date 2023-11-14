//Dependencia que trabaja con node.js y me ayuda a crear mi app 
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config();
const version = process.env.API_VERSION;

// creamos nuestra app
const app = express()

//Configurar Header HTTP - configurar Cors y hacer peticiones
app.use(cors())
//importar Rutas
const authRoutes = require('./router/auth')

//Configurar Body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Configurar static folder -> Carpeta con imgs
app.use(express.static('uploads'))

//Configurar Rutas
app.use(`/api/${version}`,authRoutes)

module.exports = app