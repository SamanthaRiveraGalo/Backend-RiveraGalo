const { Router } = require('express')
const { userModel } = require('../dao/models/users.model')

const router = Router()


router.get('/', async (req, res) => {
    const users = await userModel.find()
    res.send(users)
})

router.post('/', async (req, response) => {
    try {

        const { first_name, last_name, email } = req.body
        const result = await userModel.create({
            first_name,
            last_name,
            email
        })

        console.log(first_name, last_name, email)
        response.status(201).send({
            status: 'succes',
            payload: result
        })
    } catch (error) {
        console.log(error)
    }
})

router.put('/:uid', async (req, res) => {

    const { uid } = req.params
    const userToReplace = req.body

    const result = await userModel.updateOne({ _id: uid}, userToReplace )

    res.status(201).send({
        status:'succes',
        payload: result
    })
})

// DELETE localhost:8080  /api/users /:uid
router.delete('/:uid', (req, res) => {
    const { userId } = req.params

    let arrayTamanno = arrayUsuarios.length
    console.log(arrayTamanno)
    let users = arrayUsuarios.filter(user => user.id !== userId)
    console.log(users.length)
    if (users.length === arrayTamanno) {
        res.status(404).send({ message: "Usuario no encontrado" })
    }
    res.status(200).send({ message: "Usuario borrado", users })
})

module.exports = router
