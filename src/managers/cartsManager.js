const fs = require('fs')

//tengo que traer el json de productos 

class CartsManager {
    constructor() {
        this.path = path
    }

    readFile = async () => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(data)
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

    //agregar un produc a card
    addProductToCart = async (cid, pid) => {
        //leo el archivo
        const carts = await this.readFile()
        //busco el cart por el id
        const cartIndex = carts.findIndex(cart => cart.id === cid)

        if (cartIndex !== -1) {
            return 'No se encuentra el carrito'
        }

        carts[cartIndex].products = { productId: pid }
        const results = await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8')
        return results

    }
}

module.exports = CartsManager