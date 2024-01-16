const express = require('express')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
//mongoose
const { connect } = require('mongoose')

const productsRouter = require('./routes/products.router.js')
const cartRouter = require('./routes/carts.router.js')
const userRouter = require('./routes/users.router.js')
const viewsRouter = require('./routes/views.router.js')
const chatRouter = require('./routes/chat.router.js')
const sessionsRouter = require('./routes/sessions.router.js')
const ChatMassage = require('./dao/managerMongo/chatManagerMongo.js')
const ProductDaoMongo = require('./dao/managerMongo/productManagerMongo.js')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')
const MongoStore = require('connect-mongo')
const massageManager = new ChatMassage()
const productService = new ProductDaoMongo()
//passport
const passport = require('passport')
const { initializePassport } = require('./config/passport.config.js')

const app = express()
const port = 8080

//conexion con MONGO
const connectDb = async () => {
  await connect('mongodb+srv://SamanthaRG:Nina1808@cluster0.lwkzqk6.mongodb.net/ecommerce?retryWrites=true&w=majority')
  console.log('Base de datos conectada')
}
connectDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser('p@l@br@Secret@')) //firma de la cookie

//con mongo 
app.use(session({
  store:MongoStore.create({
    mongoUrl:'mongodb+srv://SamanthaRG:Nina1808@cluster0.lwkzqk6.mongodb.net/ecommerce?retryWrites=true&w=majority',
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    ttl:160,
  }),
  secret: 'palabraSecreta',
  resave: true,
  saveUninitialized: true
}))

//MIDDLEWARE PASSPORT
initializePassport()

// app.use(session({
//   secret: 'p@l@br@Secret@'
// }))

app.use(passport.initialize())
app.use(passport.session())


//MOTOR DE PLANTILLA
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}))
app.set('view engine', '.hbs')
app.set('views', __dirname + '/views')

//VIEWS
app.use('/views', viewsRouter)
app.use('/views', chatRouter)

//API
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/api/users', userRouter)
app.use('/api/sessions', sessionsRouter)


// ejemplo en consola para saber que se levanto el servidor y que esta escuchando en el puerto 8080
const serverHttp = app.listen(port, () => {
  console.log(`Server listening at [localhost:${port}]`);
});

const io = new Server(serverHttp)


io.on("connection", socket => {

  //SOCKETIO PRODUCTS
  console.log("Client connected");

  socket.on('add-product', async newProduct => {
    try {

      await productService.createProduct(newProduct)
      const productsList = await productService.getProducts()

      io.emit('update-products', productsList);

    } catch (error) {
      console.log(error)
    }

  });

  socket.on('delete-product', async productId => {
    try {

      await productService.deleteProduct(productId)
      const productsList = await productService.getProducts()
      console.log(productId)//null
      io.emit('update-products', productsList)

    } catch (error) {
      console.error(error)
    }

  })

  //SOCKETIO MENSSAJE

  socket.on('message', async data => {

    try {

      let user = data.user;
      let message = data.message;

      await massageManager.addMessage(user, message);

      // Obtener todos los mensajes desde Mongo
      const allMessages = await massageManager.getMessages();

      // Emitir los mensajes actualizados a los clientes
      io.emit('messageLogs', allMessages);

    } catch (error) {
      console.error('Error al guardar o emitir mensajes:', error);
    }


  })

});