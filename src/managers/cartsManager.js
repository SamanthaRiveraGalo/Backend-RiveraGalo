const fs = require('node:fs')

const path = './src/mockDB/carts.json'

class CartsManager {
    constructor() {
        this.path = path
        this.cart = []
    }

    //crear carrito
    createCart = async () => {

        let newCart
        if (this.cart.lenght === 0) {
            newCart = { id: 1, products: [] }
        } else {
            newCart = { id: this.cart.lenght + 1, products: [] }
        }

        this.cart.push(newCart)

        const jsonCart = JSON.stringify(this.cart);
        await fs.promises.writeFile(this.path, jsonCart);
    }

    //por id
    getCartById = async (cid) => {

        const cartString = await fs.promises.readFile(this.path, 'utf-8');
        const cartArray = JSON.parse(cartString);

        const cart = cartArray.find(cart => cart.id === cid);

        if (!cart) {
            return 'No se encontro el carrito';
        }

        return cart;

    }

    //agregar un producto
    addProductToCart = async (cid, pid) => {
        //leo el archivo
        const cartString = await fs.promises.readFile(this.path, 'utf-8');
        const cartArray = JSON.parse(cartString);

        //busco el cart por el id
        const cartIndex = cartArray.findIndex(cart => cart.id === cid)

        if (cartIndex !== -1) {
            return 'No se encuentra el carrito'
        }

        //busco el producto en el carrito con el id
        const productCarts = cartArray[cartIndex].products.find(product => product.id === pid)

        //si el producto no existe, lo agrego
        if (!productCarts) {
            cartArray[cartIndex].products.push({ id: pid, quantity: 1 })
        } else {
            //si el producto existe, incremento la cantidad
            productCarts.quantity++
        }
        //luego lo escribo
        const results = await fs.promises.writeFile(this.path, JSON.stringify(cartArray, null, 2), 'utf-8')
        return results

    }
}
module.exports = CartsManager