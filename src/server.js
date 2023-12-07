const express = require('express')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')

const productsRouter = require('./routes/products.router.js')
const cartRouter = require('./routes/carts.router.js')
const viewsRouter = require('./routes/views.router.js')

const ProductManager = require('./managers/productManager.js')

const app = express()
const port = 8080

const managerService = new ProductManager()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))


//MOTOR DE PLANTILLA
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.set('views', __dirname + '/views')

//VIEWS
app.use('/views', viewsRouter)

//API
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)


// ejemplo en consola para saber que se levanto el servidor y que esta escuchando en el puerto 8080
const serverHttp = app.listen(port, () => {
  console.log(`Server listening at [localhost:${port}]`);
});

const io = new Server(serverHttp)

//aca van todos los on y emit del lado del backend

io.on("connection", socket => {

  console.log("Client connected");

  socket.on('add-product', async newProduct => {

    await managerService.addProduct(newProduct)
    const productsList = await managerService.getProducts()

    io.emit('update-products', productsList);
  });

  socket.on('delete-product', async (productId) => {

    await managerService.deleteProduct(productId)
    const productsList = await managerService.getProducts()

    io.emit('update-products', productsList)

  })

});
