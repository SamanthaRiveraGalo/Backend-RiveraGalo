const productModel = require("../models/product.model")

class ProductDaoMongo {
    constructor() {
        this.model = productModel
    }

    async getProducts() {
        return await this.model.find().lean()
    }

    async getProductById(pid) {

        return await this.model.findOne({ _id: pid })
    }

    async createProduct(newProduct) {

        return await this.model.create(newProduct)
    }

    async updateProduct(pid, productToUpdate) {

        return await this.model.findByIdAndUpdate({ _id: pid }, productToUpdate)
    }

    async deleteProduct(pid) {
        
        return await this.model.deleteOne({ _id: pid })
    }

}

module.exports = ProductDaoMongo