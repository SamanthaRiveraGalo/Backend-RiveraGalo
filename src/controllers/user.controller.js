const { usersService } = require("../repositories/index.js")


class UserController {

    constructor() {
        this.userServiceMongo = usersService
    }

    getUsers = async (req, res) => {
        const users = await this.userServiceMongo.getUsers()
        res.send(users)
    }

    getUserBy = async (req, res) => {
        const  {email}  = req.params;

        try {
            const user = await this.userServiceMongo.getUserBy({ email });
            res.json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
       
    }

    createUser = async (req, res) => {
        try {

            const { first_name, last_name, email, password } = req.body

            const newUser = {first_name, last_name, email, password}

            const result = await this.userServiceMongo.createUser(newUser)

            res.status(201).send({
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
        const result = await this.userServiceMongo.deleteUser(userId)
        res.status(200).send({ message: "Usuario borrado", result })
    }
}

module.exports = UserController