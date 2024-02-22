const ticketModel = require("../models/ticket")

class TicketDao {

    async createTicket(totalAmount, purchaser) {

        const ticket = new ticketModel({ amount: totalAmount, purchaser: purchaser });

        await ticket.save();
    };

    async getTicketsUser(purchaserMail) {

        const tickets = await ticketModel.find({ purchaser: purchaserMail });

        return tickets;
    }


};

module.exports = { TicketDao };

// class TicketDao {
//     constructor() {
//         this.ticket = ticketModel
//     }

//     async get() {
//         return await this.ticket.find()
//     }

//     async getBy(purchaserMail) {
//         return await this.ticket.find({ purchaser: purchaserMail })
//     }

//     async create(totalAmount, purchaser) {
//         return await this.ticket.create({amount: totalAmount, purchaser:purchaser})
//     }

//     async update(tid, ticketUpdate) {
//         return await tiketModel.findOneAndUpdate({ _id: tid }, ticketUpdate)
//     }

//     async delete(tid) {
//         return await this.ticket.findOneAndDelete({ _id: tid })
//     }

// }

// module.exports = {
//     TicketDao
// }