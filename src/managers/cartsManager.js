const fs = require('node:fs')

class CartsManager {
    constructor(path) {
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

        const carts = await this.readFile();
        const cartId = carts.find((cart) => cart.id === parseInt(cid));

        return cartId || []; // Devuelve el carrito si lo encuentra, o un array vacío si no lo encuentra
    }

    // //agrego un producto al carrito 
    // async addProductToCart(cid, pid) {

    //     //leo el archivo
    //     let cartById = await this.readFile()

    //     //busco el id del carrito
    //     const cartIndex = cartById.findIndex((x) => (x.id == cid));

    //     //si el carrito no esta creo una copia del carrito y del objeto 
    //     if (cartIndex !== -1) {
    //         const cartCopia = [...cartById];
    //         const carritoEncontrado = { ...cartById[cartIndex] };
    //         //busco el id del producto en el array carrito 
    //         const productIndex = carritoEncontrado.products.findIndex((p) => parseInt(p.pid) === parseInt(pid));

    //         //si lo encuentra aumento la cnatidad en 1 sino se agrega la cantidad 1
    //         if (productIndex !== -1) {
    //             carritoEncontrado.products[productIndex].quantity += 1;
    //         } else {
    //             carritoEncontrado.products.push({ pid: parseInt(pid), quantity: 1 });
    //         }

    //         //actualizo la copia del array con todos los cambios
    //         cartCopia[cartIndex] = carritoEncontrado;

    //         const nuevaListaString = JSON.stringify(cartCopia, null, 2);
    //         await fs.promises.writeFile('carrito.json', nuevaListaString);
    //     }
    //     else {
    //         console.log('No se encontro el carrito con ese id')
    //     }
    // }

    addProductToCart = async (cid, pid) => {
        //leo el archivo
        const carts = await this.readFile()
        //busco el cart por el id
        const cartIndex = this.getCartById(cid)

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