const mongoose = require('mongoose')

// const dotenv = require('dotenv')

// dotenv.config()
// const configObject = {
//     PORT:process.env.PORT || 8080,
//     mongo_url: '',
//     jwt_secret_key: '',
//     gh_client_key: '',
//     gh_secret_key: ''
// }

//conexion con MONGO
exports.connectDb = async () => {
    await mongoose.connect('mongodb+srv://SamanthaRG:Nina1808@cluster0.lwkzqk6.mongodb.net/ecommerce?retryWrites=true&w=majority')
    console.log('Base de datos conectada')
}
