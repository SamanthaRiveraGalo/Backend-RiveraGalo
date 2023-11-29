const fs = require("node:fs");

class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    // clear products
    async clearProducts() {

        this.products = [];
        const productsJSON = JSON.stringify(this.products, null, 2);

        await fs.promises.writeFile(this.path, productsJSON);

    }

    //validaciones
    validateProduct = ({ title, description, price, thumbnails, code, stock }) => {

        if (!title || !description || !price || thumbnails || !code || !stock) {
            throw new Error("Por favor, complete todos los campos");
        }

        const existingProduct = this.products.find((product) => product.code === code);
        if (existingProduct) {
            throw new Error("Ya existe un producto con el mismo título.");
        }
    };


    async addProduct(title, description, price, thumbnails, code, stock) {

        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnails,
            code,
            stock
        };

        this.validateProduct(newProduct);
        this.products.push(newProduct);
        const productsJSON = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, productsJSON);
        return newProduct;
    }


    async getProducts() {

        const productsJSON = await fs.promises.readFile(this.path, "utf-8");
        this.products = JSON.parse(productsJSON);

        return this.products;
    }


    async getProductById(id) {

        const product = this.products.find((product) => product.id === id);

        if (!product) {
            throw new Error("No se encontro el producto");
        }

        return product;
    }


    async updateProduct(id, title, description, price, thumbnails, code, stock) {
        //busco el producto por el indice
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            throw new Error("Product not found");
        }

        if (!title || !description || !price || thumbnails || !code || !stock) {
            throw new Error("Missing properties");
        }

        //actualizo el producto 
        this.products[productIndex] = { id, title, description, price, thumbnails, code, stock };

        const productsJSON = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, productsJSON);

        return this.products[productIndex];
    }


    async deleteProduct(id) {

        const productIndex = this.products.findIndex((product) => product.id === id);

        if (productIndex === -1) {
            throw new Error("Product not found");
        }

        const deletedProduct = this.products[productIndex];
        this.products.splice(productIndex, 1);

        const productsJSON = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, productsJSON);

        return deletedProduct;
    }
}

module.exports = ProductManager;