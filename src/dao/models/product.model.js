const { Schema, model } = require('mongoose')

const productCollection = 'products'

const productSchema = Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    thumbnails: {
        type: String,
    }
})

const productModel = model(productCollection, productSchema)

module.exports = productModel