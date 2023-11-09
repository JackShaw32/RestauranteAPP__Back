const mongoose = require('mongoose');
// Para leer las variables de nuestro proyecto (.env)
require('dotenv').config();

// Importamos nuestro app
const app = require('./app')

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const ipServer = process.env.IP_SERVER;
const version = process.env.API_VERSION;
const port = 3977

// conectar con la base
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/`);
    app.listen(port, () =>{
      console.log('=========================')
      console.log('==========API============')
      console.log('=========================')
      console.log(`htpp://${ipServer}${port}/api/${version}/`)
    })
  } catch (er) {
    console.log("No se pudo conectar con la base, error: ", er);
  }
};

connectDB();
