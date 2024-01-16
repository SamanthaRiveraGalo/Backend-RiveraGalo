const { Router } = require('express')
// const { userModel } = require('../dao/models/users.model')
const userMongoManager = require('../dao/managerMongo/userMongoManager')

const router = Router()

const userServiceMongo = new userMongoManager()


router.get('/', async (req, res) => {
    const users = await userServiceMongo.getUser()
    res.send(users)
})

router.get('/:email', async (req, res) => {
    const {email} = req.params;

    try {
        const user = await userServiceMongo.getUserBy({ email });
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/', async (req, response) => {
    try {

        const { first_name, last_name, email } = req.body
        const result = await userServiceMongo.create({
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

    const result = await userServiceMongo.updateUser(uid, userToReplace)

    res.status(201).send({
        status: 'succes',
        payload: result
    })
})

// DELETE localhost:8080  /api/users /:uid
router.delete('/:uid', async (req, res) => {
    const { userId } = req.params
    const result = await userServiceMongo.deleteUSer(userId)
    res.status(200).send({ message: "Usuario borrado", result })
})

module.exports = router
