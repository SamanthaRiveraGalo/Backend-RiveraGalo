const { Router } = require('express')
const ProductManager = require('../managers/productManager')

const router = Router()

const productsService = new ProductManager()

//traer productos
router.get('/', async (req, res) => {

    try {
        const limit = parseInt(req.query.limit)
        //traigo los productos 
        const products = await productsService.getProducts()

        // si el limit no es NaN entonces
        if (!isNaN(limit)) {

            res.status(200).json({ status: "ok", data: products.slice(0, limit) });

        } else {
            res.status(200).json({ status: "ok", data: products });
        }
    } catch (error) {
        res.status(500).json({ error: error.menssage })
    }

})

//con el id (un solo producto)
router.get('/:pid', async (req, res) => {

    try {

        const productId = parseInt(req.params.pid);
        const product = await productsService.getProductsById(productId);

        res.status(200).json({ status: "ok", data: product });

    } catch (error) {

        res.status(404).json({ status: "error", message: error.message });
    }
});

//post- agregar un nuevo producto - con addproducts()
router.post('/', async (req, res) => {

    try {

        const newProduct = req.body
        const productAdd = await productsService.addProduct(newProduct)

        res.status(200).json({status:"ok", data:productAdd})

    } catch (error) {
        res.status(500).json({ status: 'error', messenge: error.messenge })
    }
})


//put tiene que tomar el producto por el id y actualizarlo usando la funcion update()

router.put('/:pid', async (req, res) => {

    try {

        const productId = parseInt(req.params.pid);
        const product = req.body

        const productUpdate = await productsService.updateProduct(productId, product)

        res.status(200).json({ status: "ok", data: productUpdate });

    }catch(error){
        res.status(500).json({ status: 'error', messenge: error.messenge })
    }
})

//delete id eliminar el producto con el id indicado

router.delete('/:pid', async (req,res)=>{

    try{

        const productId = parseInt(req.params.pid)
        const productDelete = await productsService.deleteProduct(productId)

        res.status(200).json({status:"ok", data: productDelete})

    } catch(error){
        res.status(500).json({status:'error', messenge: error.message})
    }
})


module.exports = router