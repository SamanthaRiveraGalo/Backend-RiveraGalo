const CartDaoMongo = require("../dao/managerMongo/cartManagerMongo");

class CartController {

    constructor() {
        this.cartService = new CartDaoMongo()
    }

    carts = async (req, res) => {
        try {
            const carts = await this.cartService.getCarts();
            if (!carts) {
                return res.status(404).send({
                    status: "Error",
                    message: { error: "Carrito no encontrado" },
                });
            }
            return res.send({ status: "Sucess", payload: carts });

        } catch (error) {
            console.log(error)
        }
    }

    cartId = async (req, res) => {

        try {

            const cartId = req.params.cid;

            const carts = await this.cartService.getCartById(cartId);


            if (!carts) {
                return res.status(404).send({
                    status: "Error",
                    message: { error: "Carrito por id no encontrado" },
                });
            }
            return res.send({ status: "Sucess", payload: carts });

        } catch (error) {
            console.log(error)
        }
    }

    createCart = async (req, res) => {
        try {

            const newCart = req.body

            const result = await this.cartService.createCart(newCart)
            if (!result) {
                return res.status(400).send({ status: "Error", message: { error: "No se pudo agregar ningun producto" } });
            }

            res.send({
                status: 'success',
                payload: result
            })

        } catch (error) {
            console.log(error);
        }

    }

    addProductCart = async (req, res) => {
        try {

            const cartId = req.params.cid;
            const prodId = req.params.pid;

            const cart = await this.cartService.AddProductToCart(cartId, prodId);
            if (!cart) {

                return res.status(400).send({
                    status: "Error",
                    message: { error: "no se pudo actualizar el carrito" }
                });

            }

            return res.status(200).send({
                status: "Success",
                payload: cart,
            });

        } catch (error) {
            console.log(error)
        }
    }

    updateCart = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const prod = req.body

            const update = await this.cartService.updateCart(cartId, prod)

            return res.status(200).send({
                status: "Success",
                payload: update,
            });


        } catch (error) {
            console.log(error)
        }
    }

    quantityUpdate = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const prodId = req.params.pid;
            const quantity = req.body.quantity;

            const updateCart = await this.cartService.updateQuantity(cartId, prodId, quantity)

            return res.status(200).send({
                status: "Success",
                payload: updateCart,
            });


        } catch (error) {
            console.log(error)
        }
    }

    cartDelete = async (req, res) => {
        try {
            const cartId = req.params.cid;

            const deleteCart = await this.cartService.deleteAllProducts(cartId);

            if (!deleteCart) {

                return res.status(400).send({
                    status: "Error",
                    message: { error: "no se pudo eliminar el carrito" }
                });

            }

            return res.status(200).send({
                status: "Success",
                payload: deleteCart,
            });

        } catch (error) {
            console.log(error);
        }
    }

    deleteProductCart = async (req, res) => {
        try {
            const cartId = req.params.cid;
            const prodId = req.params.pid;

            const deleteProduct = await this.cartService.deleteProduct(cartId, prodId)

            if (!deleteProduct) {

                return res.status(400).send({
                    status: "Error",
                    message: { error: "no se pudo eliminar el producto del carrito" }
                });

            }

            return res.status(200).send({
                status: "Success",
                payload: deleteProduct,
            });

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CartController
