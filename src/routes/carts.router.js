const { Router } = require('express')
const CartsManager = require('../managers/cartsManager')

const router = Router()

const cartsService = new CartsManager()

router.get('/:cid', async (req, res) => {
    try {
        const cid = req.params.cid;
        const cartById = await cartsService.getCartById(cid);
        if(cartById) {
          res.status(200).json(cartById);
        }
        else{
          res.status(404).send('No se encontró ningún carrito!')
        }
    } catch (error) {
        console.log(error)
    }
  })

//post
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
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

        const addProduct = await cartsService.addProductToCart(cid, productId)

        res.status(200).json({
            status: "ok",
            data: addProduct
        })

    } catch (error) {
        console.log(error)
    }
})


module.exports = router