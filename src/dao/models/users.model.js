const { Schema, model } = require('mongoose')

const userCollection = 'users'

const UserSchema = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
})

const userModel = model(userCollection, UserSchema)

module.exports = { userModel }