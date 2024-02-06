const userMongoManager = require('../dao/managerMongo/userMongoManager')

class UserController {

    constructor() {
        this.userServiceMongo =  new userMongoManager()
    }

    getUser = async (req, res) => {
        const users = await this.userServiceMongo.getUser()
        res.send(users)
    }

    getUserByEmail = async (req, res) => {
        const { email } = req.params;

        try {
            const user = await this.userServiceMongo.getUserBy({ email });
            res.json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    createUser = async (req, response) => {
        try {

            const { first_name, last_name, email } = req.body
            const result = await this.userServiceMongo.create({
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
    }

    updateUser = async (req, res) => {

        const { uid } = req.params
        const userToReplace = req.body

        const result = await this.userServiceMongo.updateUser(uid, userToReplace)

        res.status(201).send({
            status: 'succes',
            payload: result
        })
    }

    deleteUser = async (req, res) => {
        const { userId } = req.params
        const result = await this.userServiceMongo.deleteUSer(userId)
        res.status(200).send({ message: "Usuario borrado", result })
    }
}

module.exports = UserController