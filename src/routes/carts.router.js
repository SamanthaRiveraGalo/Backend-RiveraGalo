const { Router } = require('express')

// const CartsManager = require('../dao/managersFile/cartsManager')
// const cartsService = new CartsManager()

const router = Router()

const CartDaoMongo = require('../dao/managerMongo/cartManagerMongo')
const cartServiceMongo = new CartDaoMongo()


router.get('/', async (req, res) => {
    try {
        const carts = await cartServiceMongo.getCarts();
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
    // try {

    //     const cid = req.params.cid;
    //     const cartById = await cartsService.getCartById(cid);

    //     if (cartById) {
    //         res.status(200).json(cartById);
    //     }
    //     else {
    //         res.status(404).send('No se encontró ningún carrito!')
    //     }

    // } catch (error) {
    //     console.log(error)
    // }
})

router.get('/:cid', async (req, res) => {

    try {

        const cartId = req.params.cid;

        const carts = await cartServiceMongo.getCartById(cartId);
     

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
})

//post
router.post('/', async (req, res) => {
    try {

        const newCart = req.body

        const result = await cartServiceMongo.createCart(newCart)
        if (!result) {
            return res.status(400).send({ status: "Error", message: { error: "No se pudo agregar ningun producto" }, });
        }

        res.send({
            status: 'success',
            payload: result
        })

    } catch (error) {
        console.log(error);
    }
    // try {
    //     console.log(req.body)
    //     const newCart = await cartsService.createCart()

    //     res.status(200).json({
    //         status: "ok",
    //         data: newCart
    //     })

    // } catch (error) {
    //     console.log(error)
    // }
})

router.put('/:cid/:pid', async (req, res) => {
    try {

        const cartId = req.params.cid;
        const prodId = req.params.pid;

        const cartUpdate = await cartServiceMongo.updateCart(cartId, prodId);

        if (!cartUpdate) {

            return res.status(400).send({
                status: "Error",
                message: { error: "no se pudo actualizar el carrito" },
            });

        }

        return res.status(200).send({
            status: "Success",
            payload: cartUpdate,
        });



    } catch (error) {
        console.log(error);
    }
});

// **DELETE**
router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;

        const deleteCart = await cartServiceMongo.deleteCart(cartId);

        if (!deleteCart) {

            return res.status(400).send({
                status: "Error",
                message: { error: "no se pudo eliminar el carrito" },
            });

        }

        return res.status(200).send({
            status: "Success",
            payload: deleteCart,
        });

    } catch (error) {
        console.log(error);
    }
});


module.exports = router