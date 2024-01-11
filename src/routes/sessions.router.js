const { Router } = require('express')
// const { authentication } = require('../middlewars/auth.middlewars')
const User = require('../dao/managerMongo/userMongoManager')

const router = Router()

const userManager = new User()

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

        const newUser = await userManager.createUser({
            first_name,
            last_name,
            email,
            password
        })

        // res.redirect('./views/profile.hbs');

        res.send({
            status: "success",
            payload: `El usuario ${newUser.first_name} ${newUser.last_name} se ha creado correctamente`
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

        const user = await userManager.getUserByEmail(email)

        if (user.email === 'adminCoder@coder.com' && password === user.password) {
            req.session.user = {
                role: 'admin'
            }
            res.redirect('/products')
        }
        else {

            if (!user || password !== user.password) {
                return res.send('email o contraseña incorrecta')
            }

            req.session.user = {
                user: user._id,
                role: user.role
            }

            res.redirect('/products')
        }

    } catch (error) {
        console.log(error)

    }
})


router.get('/logout', (req, res) => {

    req.session.destroy(err => {
        if (err) return res.send({ status: 'error', error: err })
    })

    res.redirect('/login')

    // res.send({
    //     status: "success",
    //     payload: `session cerrada`
    // })

})

//una ruta para probar que funciona bien
// router.get('/current', authentication, (req, res) => {
//     res.send('informacion sensible que solo puede ver el admin')
// })



module.exports = router