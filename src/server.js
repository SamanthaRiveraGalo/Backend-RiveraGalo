const express = require('express')
//importaciones
const productsRouter = require('./routes/products.router.js')
const cartRouter = require('./routes/carts.router.js')

const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

// ejemplo en consola para saber que se levanto el servidor y que esta escuchando en el puerto 8080
app.listen(port, () => {
    console.log(`Server listening at [localhost:${port}]`);
})