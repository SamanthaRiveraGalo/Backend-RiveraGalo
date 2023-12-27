const { Router } = require('express')

const ProductDaoMongo = require('../dao/managerMongo/productManagerMongo')

const router = Router()

const productService = new ProductDaoMongo()

//RUTA CON HANDLEBARS
router.get('/', async (req, res) => {

    const products = await productService.getProducts()

    res.render('index', { products })

})

//WEBSOCKET AGREGAR UN PRODUCTO Y ELIMINAR UN PRODUCTO

router.get("/realtimeproducts", async (req, res) => {
    try {

        const products = await productService.getProducts()
        res.status(200).render("realTimeProducts", { products });

    } catch (error) {
        console.log(error)
    }

});



module.exports = router