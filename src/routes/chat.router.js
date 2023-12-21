const { Router } = require('express')

const ChatMassage = require('../dao/managerMongo/chatManagerMongo')

const chatManager = new ChatMassage()

const router = Router()

router.get("/:chat", async (req, res) => {

   res.render("chat")

})


module.exports = router