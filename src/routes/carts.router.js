const { Router } = require('express')
const CartsManager = require('../managers/cartsManager')
const cartsService = new CartsManager()
const router = Router()

router.get('/cid', async (req,res)=>{
    try {
        const {cid} = parseInt(req.params)
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
router.post('/', async (req,res)=>{
    const newCart = await cartsService.createCart()
    res.status(200).json({
        status:"ok",
        data:newCart
    })
})

//post
router.post('/:cid/product/:pid', async(req,res)=>{
    const cid = req.params.cid
    const pid = req.params.pid

    const addProduct = await cartsService.addProductToCart(cid,pid)
    res.status(200).json({
        status:"ok",
        data:addProduct
    })
})

module.exports = router