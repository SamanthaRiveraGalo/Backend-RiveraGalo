const User = require("../dao/managerMongo/userMongoManager");
const { isValidPassword, createHash } = require("../utils/hashPassword");
const { createToken } = require("../utils/jwt");

const userManager = new User()

class SessionsController {
    constructor() {
    }

    signUp = async (req, res) => {
        try {

            const { fullname, first_name, last_name, email, password } = req.body

            if (first_name === '' || last_name === '' || email === '' || password === '') {
                return res.status(404).json({ error: "Por favor ingrese todos los datos" });
            }

            const user = await userManager.getUserBy({ email: email })

            if (user) {
                return res.send({ status: 'error', error: 'El email ya se encuentra registrado' })
            }

            const newUser = {
                fullname,
                first_name,
                last_name,
                email,
                password: createHash(password)
            }

            const result = await userManager.createUser(newUser)

            const token = createToken({ id: result._id })

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

    }

    login = async (req, res) => {

        try {

            const { email, password } = req.body

            if (email === '' || password === '') {
                return res.status(404).json({ error: "Por favor ingrese todos los datos" });
            }

            const user = await userManager.getUserBy({ email: email })

            if (!isValidPassword(user, password)) {
                return res.send('email o contraseña incorrecta');
            }

            const token = createToken({ id: user._id, role: user.role });
            console.log(token)

            res.cookie('token', token, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true,
            }).json({
                status: 'success',
                message: 'logged in',
            });

        } catch (error) {
            console.log(error)

        }
    }

    logout = (req, res) => {

        req.session.destroy(err => {
            if (err) return res.send({ status: 'error', error: err })
        })

        res.redirect('/views/login')
    }

    // current = async (req, res) => {

    //     if (req.user) {

    //         const { first_name, last_name, role } = req.user
            
    //         const userDto = {
    //             first_name: first_name,
    //             last_name: last_name,
    //             role: role
    //         }

    //         console.log(userDto)
    //         res.json(userDto)

    //     } else {
    //         res.status(401).json({ error: "No autorizado" })
    //     }
    //     // res.send('informacion sensible que solo puede ver el admin')
    // }
    current = async (req, res) => {
        try {
          const user = await req.user;
      
          if (user) {
            const { first_name, last_name, role } = user;
            
            const userDto = {
              first_name,
              last_name,
              role
            };
      
            console.log(userDto);
            res.json(userDto);
          } else {
            res.status(401).json({ error: "No autorizado" });
          }
        } catch (error) {
          console.error("Error de autenticación:", error);
          res.status(500).json({ error: "Error interno" });
        }
      }

    github = async (req, res) => { }

    githubCallback = (req, res) => {
        req.session.user = req.user
        res.redirect('/views/products')
    }

    failRegister = (req, res) => {

        res.send({ status: 'error', error: 'failed' })

    }

    loginGithub = async (req, res) => {

        if (!req.user) return res.status(400).send({ status: 'error', error: 'credenciales no validas' })

        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }

        res.send({ status: 'succes', message: 'login exitoso' })
    }

    failLogin = (req, res) => {
        res.send({ status: 'error', error: 'failed login' })
    }


}

module.exports = SessionsController