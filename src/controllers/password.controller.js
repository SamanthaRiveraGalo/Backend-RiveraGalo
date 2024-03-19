const { Console } = require("winston/lib/winston/transports/index.js");
const { configObject } = require("../config/index.js")
const { usersService } = require("../repositories/index.js")
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

class PasswordController {
    constructor() {
        this.userServiceMongo = usersService
    }

    passwordMail = async (req, res) => {

        try {
            const email = req.body.email

            const user = await this.userServiceMongo.getUserBy({ email })

            if (!user) {
                return res.status(404).json({ status: 'error', error: 'Usuario no encontrado' })
            }

            //generar el token nuevo - en una hora expira
            const newToken = jwt.sign({ email }, configObject.jwt_secret_key, { expiresIn: '1 h' })

            const transport = nodemailer.createTransport({

                service: 'gmail',
                port: 587,
                auth: {
                    user: configObject.gmail_user_app,
                    pass: configObject.gmail_pass_app
                }

            })

            const mailOptions = {
                from: 'Este mail lo envia <samirivera1808@gmail.com>',
                to: email,
                subject: "Restaurar contraseña",
                html: `<h1>Recuperar la contraseña</h1>
                      <hr>
                      <p> Por favor ingrese al siguiente link para recuperar su contraseña, el link expira dentro de 1 hora</p>
                      <a href="http://localhost:8080/views/restorePassword/${newToken}">CLICK HERE</a>
                     `,
            };

            transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error al enviar correo electrónico:', error);
                    return res.status(500).json({ error: 'Error al enviar correo electrónico' });
                }

                console.log('Correo electrónico enviado:', info.response)
                return res.status(200).json({ message: 'Correo electrónico de restablecimiento enviado' })
            });


        } catch (error) {
            console.log(error)
        }
    }

    //ruta para restablecer la contrasenia

    restorePassword = async (req, res) => {
        try {
            const { newpassword } = req.body 
            const { token } = req.params 

            const data = jwt.decode(token)

            console.log('data',data)

            if (!data) {
                return res.status(401).json({ error: 'Token no válido o expirado' })
            }

            const email = data.email

            console.log('email', email)

            const user = await this.userServiceMongo.getUserBy({ email })

            if (!user) {
                return res.status(401).send('Usuario no encontrado')
            }

            const hashPassword = bcrypt.hashSync(newpassword, bcrypt.genSaltSync(10))

            if (hashPassword === user.password) {
                return res.status(400).json({ error: 'La nueva contraseña no puede ser igual a la anterior' })
            }

            await this.userServiceMongo.updateUser(user._id, hashPassword)

            return res.status(200).json({ message: 'Contraseña actualizada correctamente' })

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = PasswordController