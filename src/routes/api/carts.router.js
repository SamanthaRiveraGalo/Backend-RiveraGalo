const { Router } = require('express')

const CartController = require('../../controllers/cart.controller')

const {
    carts,
    cartId,
    createCart,
    addProductCart,
    updateCart,
    quantityUpdate,
    cartDelete,
    deleteProductCart,
} = new CartController()


const router = Router()


router.get('/', carts)

router.get('/:cid', cartId)

router.post('/',createCart)

router.post('/:cid/products/:pid', addProductCart)

router.put('/:cid', updateCart)

router.put('/:cid/products/:pid', quantityUpdate)

router.delete('/:cid', cartDelete);

router.delete('/:cid/products/:pid', deleteProductCart)



module.exports = router