const { Router } = require('express')

const ChatMassage = require('../dao/managerMongo/chatManagerMongo')

const chatManager = new ChatMassage()

const router = Router()

router.get("/chat", async (req, res) => {
   const chat = await chatManager.getMessages()
   res.render("chat", {chat})
})


module.exports= router