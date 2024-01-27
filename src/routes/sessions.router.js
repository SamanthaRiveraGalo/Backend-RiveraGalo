const { Router } = require('express')
const User = require('../dao/managerMongo/userMongoManager')
const { createHash, isValidPassword } = require('../utils/hashPassword')
const passport = require('passport')
const { createToken } = require('../utils/jwt')
const { passsportCall } = require('../utils/passportCall')
const { authorizationJwt } = require('../middlewars/jwtPassport.middleware')

const router = Router()

const userManager = new User()

//JWT

router.post('/register', async (req, res) => {
    try {

        const { first_name, last_name, email, password } = req.body

        if (first_name === '' || last_name === '' || email === '' || password === '') {
            return res.status(404).json({ error: "Por favor ingrese todos los datos" });
        }

        const user = await userManager.getUserByEmail(email)

        if (user) {
            return res.send({ status: 'error', error: 'El email ya se encuentra registrado' })
        }

        const newUser = {
            first_name,
            last_name,
            email,
            password: createHash(password)
        }

        const result = await userManager.createUser(newUser)

        const token = createToken({ id: result._id})

        console.log(token)

        res.cookie('token', token, {
            maxAge: 60 * 60 * 1000 * 24,
            httpOnly: true,
        }).json({
            status: 'succes',
            message: 'registro exitoso'
        })


    } catch (error) {
        console.log(error)
    }

})


router.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body

        if (email === '' || password === '') {
            return res.status(404).json({ error: "Por favor ingrese todos los datos" });
        }

        if (email === 'adminCoder@coder.com' && password === '1234') {

            req.session.user = {
                name: 'coder',
                role: 'admin'
            }

            res.redirect('/views/products')

        } else {

            const user = await userManager.getUserByEmail(email)

            if(!isValidPassword(user, password)){
                return res.send('email o contraseña incorrecta')
            }

            const token = createToken({ id: user._id, role: user.role })
            console.log(token)

            res.cookie('token', token, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true,
            }).json({
                status: 'succes',
                message: 'logged in'
            })
        }

    } catch (error) {
        console.log(error)

    }
})


//una ruta para probar que funciona bien
router.get('/current',[ passsportCall('jwt'),authorizationJwt(['ADMIN'])],(req,res) => {
    res.send('informacion sensible que solo puede ver el admin')
})

//GitHUB

// //cuando apretamos el boton de login de github nos lleva a esta ruta
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })
//cuando nos redirecciones nos devuelve los datos aca

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user
    res.redirect('/views/products')
})

router.post('/registergithub', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }))

router.get('/failregister', (req, res) => {

    res.send({ status: 'error', error: 'failed' })

})


router.post('/logingithub', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), async (req, res) => {

    if (!req.user) return res.status(400).send({ status: 'error', error: 'credenciales no validas' })

    req.session.user = {
        email: req.user.email,
        first_name: req.user.first_name
    }

    res.send({status:'succes', message: 'login exitoso'})
})

router.get('/faillogin', (req, res) => {
    res.send({ status: 'error', error: 'failed login' })
})


router.get('/logout', (req, res) => {

    req.session.destroy(err => {
        if (err) return res.send({ status: 'error', error: err })
    })

    res.redirect('/views/login')
})

module.exports = router