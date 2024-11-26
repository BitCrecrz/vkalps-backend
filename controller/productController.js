const mongoose = require("mongoose");
const productSchema = require("../schema/productSchema");



// const product = mongoose.Collection('product')

const createNewProduct = async (req, res,) => {
    console.log('got hit', req.headers.authorization, req.file.path)
    const image = req.file.path
    const { name, price, category, inStock } = req.body
    if (!name && !price && !category && !inStock) {
        return res.status(400).send(' name,price,category,inStock required ')
    }
    const createdProduct = await productSchema.create({
        name,
        price,
        category,
        inStock,
        image
    })
    return res.status(200).send({ message: 'product created', data: createdProduct })
}

const getAllProducts = async (req, res,) => {
    console.log('request')
    const allProducts = await productSchema.find()
    if (allProducts.length === 0) {
        return res.status(404).send({
            message: 'no products found'
        })
    }
    return res.status(200).json({ message: 'product fetched', data: allProducts })
}

const getProductById = async (req, res) => {
    const { id } = req.params

    console.log('id', id, req.params)
    const Product = await productSchema.findById(id)
    if (!Product) return res.status(404).send({
        message: 'no products found with that id'
    })
    return res.status(200).send({ message: 'product fetched', data: Product })
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const updates = req.body
    const updatedProduct = await productSchema.findByIdAndUpdate(id, updates, { new: true })
    if (!updatedProduct) return res.status(404).send({
        message: 'no products found with that id'
    })
    return res.status(200).send({ message: 'product updated', data: updatedProduct })
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    const updates = req.body
    const updatedProduct = await productSchema.findByIdAndDelete(id)
    console.log('updatedProduct', updatedProduct)
    if (!updatedProduct) return res.status(404).send({
        message: 'no products found with that id'
    })
    return res.status(200).send({ message: 'product updated', data: updatedProduct })
}
module.exports = { createNewProduct, getAllProducts, updateProduct, deleteProduct, getProductById }