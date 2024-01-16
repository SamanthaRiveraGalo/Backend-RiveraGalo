const passport = require('passport')
const local = require('passport-local')
// const userModel = require('../dao/models/users.model')
const User = require('../dao/managerMongo/userMongoManager')
const { createHash, isValidPassword } = require('../utils/hashPassword')
const userService = new User()
const GithubStrategy = require('passport-github2')

const LocalStrategy = local.Strategy//instanciando la clase

exports.initializePassport = () => {

    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.f832a7e8bc5ff041',
        clientSecret: '0d8a0231fd415a1eade6ca81044fd784d57dc773',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accesToken, refreshToken, profile, done) => {
        try {
            let user = await userService.getUserBy({ email: profile._json.email })
            if (!user) {
                //para registrar en caso que no exista user
                let newUser = {
                    first_name: profile.username,
                    last_name: profile.username,
                    email: profile._json.email,
                    password: ''
                }
                let result = await userService.createUser(newUser)
                return done(null, result)
            }
            // null-no hay error
            done(null, user)
        } catch (error) {
            return done(error)
        }
    }))

    // guardar y recuperar credenciales del usario de session
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userService.getUserBy({ _id: id })
        done(null, user)
    })


    passport.use('register', new LocalStrategy({
        //para acepte la llamada del req
        passReqToCallBack: true,
        //cambiamos el nombre por que no tenemos username
        usernameField: 'email'
    }, async (req, username, password, done) => {

        try {

            const { firts_name, last_name, email } = req.body
            let userFound = await userService.getUserBy({ email: username })
            console.log(userFound)

            if (userFound) returndone(null, false)

            let newUser = {
                firts_name,
                last_name,
                email: username,
                password: createHash(password)
            }
            let result = await userService.createUser(newUser)
            console.log(result)

            return done(null, result)

        } catch (error) {
            return done('No se pudo crear el usuario' + error)
        }
    }))


    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {

        try {

            const user = await userService.getUserBy({ email: username })

            if (!user) {
                console.log('No existe el usuario')
                return done(null, false)
            }

            if (!isValidPassword(password, { password })) return done(null, false)

            return done(null, user)

        } catch (error) {
            return done(error)
        }
    }))
}