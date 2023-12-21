const { Router } = require('express')

const ChatMassage = require('../dao/managerMongo/chatManagerMongo')

const chatManager = new ChatMassage()

const router = Router()

router.post("/chat/:user/:message", async(req, res) => {
   let user = req.params.user;
   let message = req.params.message;
   const messages = await chatManager.addMessage(user, message)
   res.send(messages)
})

router.get("/chat", async (req, res) => {
   const chat = await chatManager.getMessages()
   res.render("chat", {chat})
})


module.exports= router