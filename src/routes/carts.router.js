const { Router } = require('express')
const CartsManager = require('../managers/cartsManager')

const router = Router()

const cartsService = new CartsManager()


router.get('/cid', async (req, res) => {
    try {
        const { cid } = parseInt(req.params)
        const cart = await cartsService.getCartById(cid)
        //validacion del carrito
        res.send({
            status: 'ok',
            payload: cart
        })
    } catch (error) {
        console.log(error)
    }
})

//post
router.post('/', async (req, res) => {
    try {
        const newCart = await cartsService.createCart()

        res.status(200).json({
            status: "ok",
            data: newCart
        })

    } catch (error) {
        console.log(error)
    }
})

//post
router.post('/:cid/product/:pid', async (req, res) => {
    try {

        const cid = req.params.cid
        const pid = req.params.pid

        const addProduct = await cartsService.addProductToCart(cid, pid)

        res.status(200).json({
            status: "ok",
            data: addProduct
        })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router