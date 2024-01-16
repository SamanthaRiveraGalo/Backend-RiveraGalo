const { Router } = require('express')
// const { authentication } = require('../middlewars/auth.middlewars')
const User = require('../dao/managerMongo/userMongoManager')
const { createHash, isValidPassword } = require('../utils/hashPassword')
const passport = require('passport')
const { createToken } = require('../utils/jwt')

const router = Router()

const userManager = new User()

//cuando apretamos el boton de login de github nos lleva a esta ruta
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })
//cuando nos redirecciones nos devuelve los datos aca

router.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user
    res.redirect('/views/products')

})

router.post('register', passport.authenticate('register', { failureRedirect: '/api/sessions/failregister' }))//aca creo que se confundio el profe y redirect como el de abajo

router.get('/failregister', (req, res) => {

    console.log('fail strategy')
    res.send({ status: 'error', error: 'failed' })

})

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/faillogin' }), async (req, res) => {

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



// router.post('/register', async (req, res) => {
//     try {

//         const { first_name, last_name, email, password } = req.body

//         if (first_name === '' || last_name === '' || email === '' || password === '') {
//             return res.status(404).json({ error: "Por favor ingrese todos los datos" });
//         }

//         const user = await userManager.getUserByEmail(email)

//         if (user) {
//             return res.send({ status: 'error', error: 'El email ya se encuentra registrado' })
//         }

//         const newUser = {
//             first_name,
//             last_name,
//             email,
//             password: createHash(password)
//         }

//         const result = await userManager.createUser(newUser)

//         res.redirect('./views/products');

//         const token = createToken({ id: result._id })
//         res.send({
//             status: "success",
//             payload: `El usuario ${newUser.first_name} ${newUser.last_name} se ha creado correctamente`,
//             token
//         })


//     } catch (error) {
//         console.log(error)
//     }

// })


// router.post('/login', async (req, res) => {

//     try {

//         const { email, password } = req.body

//         if (email === '' || password === '') {
//             return res.status(404).json({ error: "Por favor ingrese todos los datos" });
//         }

//         if (email === 'adminCoder@coder.com' && password === '1234') {

//             req.session.user = {
//                 name: 'coder',
//                 role: 'admin'
//             }

//             res.redirect('/views/products')

//         } else {

//             const user = await userManager.getUserByEmail(email)

//             if (!user || password !== user.password) {
//                 return res.send('email o contraseña incorrecta')
//             }
//             if(!isValidPassword(password,{password:user.password})){
//                 return res.send('email o contraseña incorrecta')
//             }

//             req.session.user = {
//                 name: user.first_name,
//                 role: user.role
//             }

//             req.session.user = {
//                 user: user._id,
//                 role: user.role
//             }

//             res.redirect('/views/products')

//             const token = createToken({ id: user._id, role: user.role })
//             res.json({
//                 status: 'succes',
//                 payload:{
//                     id:user._id,
//                     first_name: user.first_name,
//                     last_name : user.last_name
//                 },
//                 token
//             })
//         }

//     } catch (error) {
//         console.log(error)

//     }
// })


//una ruta para probar que funciona bien
// router.get('/current', authentication, (req, res) => {
//     res.send('informacion sensible que solo puede ver el admin')
// })



module.exports = router