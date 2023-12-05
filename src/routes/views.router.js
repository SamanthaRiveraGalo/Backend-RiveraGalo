const { Router } = require('express')

const ProductManager = require('../managers/productManager')

const router = Router()

const managerService = new ProductManager("./src/mockDB/products.json")



//RUTA CON HANDLEBARS
router.get('/', async (req, res) => {

    const products = await managerService.getProducts()

    res.render('index', { products })

})

//WEBSOCKET AGREGAR UN PRODUCTO Y ELIMINAR UN PRODUCTO

router.get("/realtimeproducts", async (req, res) => {

    const products = await managerService.getProducts();

    res.status(200).render("realTimeProducts", { products });
    
});



module.exports = router