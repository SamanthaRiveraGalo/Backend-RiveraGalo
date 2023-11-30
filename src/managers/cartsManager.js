const fs = require('node:fs')

const path = './src/mockDB/carts.json'

class CartsManager {
    constructor() {
        this.path = path
        this.cart = []
    }

    //leo el archivo 
    readFile = async () => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            console.log(data)
            return JSON.parse(data)
        } catch (error) {
            return []
        }
    }

    //crear carrito
    createCart = async () => {

        const carts = this.readFile()

        let newCart;
        if (carts.length > 0) {
            newCart = { id: carts.length + 1, products: [] };
        } else {
            newCart = { id: 1, products: [] };
        }

        this.cart.push(newCart);

        const jsonCart = JSON.stringify(this.cart);
        await fs.promises.writeFile(this.path, jsonCart);

        return newCart;
    };

    //por id
    getCartById = async (cid) => {

        const cartId = this.cart.find((cart) => (cart.id == cid));

        if (!cartId) {
            return 'No se encontro el carrito';
        }

        return cartId.products;
    }

    //agrego un producto al carrito 
    async addProductToCart(cid, productId) {

        //leo el archivo
        let cartById = this.readFile()

        //busco el id del carrito
        const cartIndex = cartById.findIndex((x) => (x.id == cid));

        //si el carrito no esta creo una copia del carrito y del objeto 
        if (cartIndex !== -1) {
            const cartCopia = [...cartById];
            const carritoEncontrado = { ...cartById[cartIndex] };
            //busco el id del producto en el array carrito 
            const productIndex = carritoEncontrado.products.findIndex((p) => parseInt(p.pid) === parseInt(productId));

            //si lo encuentra aumento la cnatidad en 1 sino se agrega la cantidad 1
            if (productIndex !== -1) {
                carritoEncontrado.products[productIndex].quantity += 1;
            } else {
                carritoEncontrado.products.push({ pid: parseInt(productId), quantity: 1 });
            }

            //actualizo la copia del array con todos los cambios
            cartCopia[cartIndex] = carritoEncontrado;

            const nuevaListaString = JSON.stringify(cartCopia, null, 2);
            await fs.promises.writeFile('carrito.json', nuevaListaString);
        }
        else {
            console.log(`No se encontró ningún carrito con el id: ${cartId}`)
        }
    }
}

module.exports = CartsManager