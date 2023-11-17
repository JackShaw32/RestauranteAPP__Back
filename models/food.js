const mongoose = require('mongoose')

const FoodSchema = mongoose.Schema ({
    name: String,
    state: Boolean,
    details: String,
    price: Number,
    category: String,
    image: String
})

module.exports = mongoose.model('Food', FoodSchema)