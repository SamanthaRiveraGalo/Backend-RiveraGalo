const fs = require('node:fs')

const path = './src/mockDB/carts.json'

class CartsManager {
    constructor() {
        this.path = path
        this.cart = []
    }

    //crear carrito
    createCart = async () => {

        let newCart;
        if (this.cart.length > 0) {
            newCart = { id: this.cart.length + 1, products: [] };
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

        const cartString = await fs.promises.readFile(this.path, 'utf-8');
        const cartArray = JSON.parse(cartString);

        const cartId = cartArray.find((cart) => (cart.id == cid));

        if (!cartId) {
            return 'No se encontro el carrito';
        }

        return cartId.products;
    }

    //agrego un producto al carrito 
    async addProductToCart(cid, productId) {

        //leo el archivo
        const cartString = await fs.promises.readFile(this.path, 'utf-8');
        const cartArray = JSON.parse(cartString);
        //busco el id del carrito
        const cartIndex = cartString.findIndex((x) => (x.id == cid));
        //si el carrito no esta creo una copia del carrito y del objeto 
        if (cartIndex !== -1) {
            const cartCopia = [...cartArray];
            const carritoEncontrado = { ...cartArray[cartIndex] };
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