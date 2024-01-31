const { Router } = require('express')

const ProductDaoMongo = require('../dao/managerMongo/productManagerMongo')
const CartDaoMongo = require('../dao/managerMongo/cartManagerMongo')
const User = require('../dao/managerMongo/userMongoManager')
const { publicAccess, privateAccess } = require('../middlewars/auth.middlewars')
const userManager = new User()

const router = Router()

const productService = new ProductDaoMongo()
const cartService = new CartDaoMongo()


//VISTA LOGIN - REGISTER Y PROFILE

router.get('/register', publicAccess, (req,res)=>{
    res.render('register')
})

router.get('/login', publicAccess,(req,res)=>{
    res.render('login')
})


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

//VISTA DE PRODUCTOS

router.get('/products',privateAccess, async (req, res) => {
    try {

        const { page = 1 } = req.query;
        const limit = req.query.limit;
        const query = req.query;

        const {
            payload: products,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage,
        } = await productService.getProducts(limit, page, query);

        return res.render("products", {
            products: products,
            page,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
        });


    } catch (error) {
        console.log(error)
    }

})

//DETALLE DE UN PRODUCTO

router.get('/products/:pid', async (req, res) => {

    try {

        const proId = req.params.pid;

        const product = await productService.getProductById(proId)


        if (!product) {
            return res.status(404).send({ status: "Error", error: "id no encontrado", });
        }

        res.status(200).render("productDetail", product);

    } catch (error) {
        console.log(error)
    }
})

//VISTA DEL CARRITO

router.get('/cart/:cid', async (req,res)=>{

    const cid = req.params.cid

    const cart = await cartService.getCartById(cid)

    res.status(200).render('cart', cart)
})


module.exports = router