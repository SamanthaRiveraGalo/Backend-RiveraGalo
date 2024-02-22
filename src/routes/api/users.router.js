const { Router } = require('express');
const UserController = require('../../controllers/user.controller');

const router = Router()

const {
    getUsers,
    getUserBy,
    createUser,
    updateUser,
    deleteUser
} = new UserController()

router.get('/', getUsers)

router.get('/:email', getUserBy);

router.post('/', createUser)

router.put('/:uid', updateUser)

router.delete('/:uid', deleteUser)

module.exports = router
