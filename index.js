const mongoose = require('mongoose');

// Para leer las variables de nuestro proyecto (.env)
require('dotenv').config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

// conectar con la base
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://juandev:${dbPass}@cluster0.sqoxzvx.mongodb.net/`);
    console.log("La conexion ha sido un exito");
  } catch (er) {
    console.log("No se pudo conectar con la base, error: ", er);
  }
};

connectDB();
