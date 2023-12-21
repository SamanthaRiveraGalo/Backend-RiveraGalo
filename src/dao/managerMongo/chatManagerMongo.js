const chatModel = require("../models/chat.model");

class ChatMassage {

    constructor() {
        this.messagesModel = chatModel;
    }

    async addMessage(user, message) {

        try {
            const messages = await this.messagesModel.create({
                user: user,
                message: message,
            });
            return messages;
        } catch (error) {
            console.log(error)
        }
    }

    async getMessages() {
        try {
            const messages = await this.messagesModel.find().lean();
            return messages;
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = ChatMassage