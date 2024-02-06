const { Router } = require('express');
const UserController = require('../../controllers/user.controller');

const router = Router()

const {
    getUser,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
} = new UserController()

router.get('/', getUser)

router.get('/:email', getUserByEmail);

router.post('/', createUser)

router.put('/:uid', updateUser)

router.delete('/:uid', deleteUser)

module.exports = router
