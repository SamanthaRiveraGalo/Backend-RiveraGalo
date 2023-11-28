const fs = require('fs')

//tengo que traer el json de productos 

class CartsManager {
    constructor(path) {
        this.path = path
    }

    readFile = async () => {
        try {
            const dataCart = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(dataCart)
        } catch {
            return []
        }
    }

    //crear carrito
    createCart = async () => {
        const carts = this.readFile()
        let newCart
        if (carts.lenght === 0) {
            newCart = { id: 1, products: [] }
        } else {
            newCart = { id: carts.lenght + 1, products: [] }
        }
        carts.push(newCart)
        const results = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
        return results
    }

    //por id
    getCartById = async (cid) => {
        const carts = await this.readFile()
        const cart = carts.find(cart => cart.id === cid)
        if (!cart) {
            return 'No se encontro el carrito'
        }
        return cart
    }

    //agregar un producto
    addProductToCart = async (cid, pid) => {
        //leo el archivo
        const carts = await this.readFile()
        //busco el cart por el id
        const cartIndex = carts.findIndex(cart => cart.id === cid)

        if (cartIndex !== -1) {
            return 'No se encuentra el carrito'
        }
        
        //busco el producto en el carrito con el id
        const productCarts = carts[cartIndex].products.find(product => product.id === pid)

        //si el producto no existe, lo agrego
        if (!productCarts) {
            carts[cartIndex].products.push({ id: pid, quantity: 1 })
        } else {
            //si el producto existe, incremento la cantidad
            productCarts.quantity++
        }
        //luego lo escribo
        const results = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
        return results
    }
}

module.exports = CartsManager