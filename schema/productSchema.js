const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, }, //must be a positive value
    category: { type: String, required: true },
    inStock: { type: Boolean, required: true, default: true },
    image: { type: String, required: false },
})

module.exports = mongoose.model('product', productSchema)
