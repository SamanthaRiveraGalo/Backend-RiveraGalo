const { Router } = require('express')
const { showChat } = require('../controllers/chat.controller')

const router = Router()

router.get("/chat", showChat)


module.exports = router