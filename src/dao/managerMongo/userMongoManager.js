const userModel = require("../models/users.model")

class User {

    constructor() {
        this.model = userModel
    }

    async getUser() {
        return await this.model.find()
    }

    async getUserBy (filter){
        return await this.model.findOne(filter)
    }

    async getUserByEmail ( uemail ){
        return await this.model.findOne({email: uemail})
    }

    async createUser (newUser) {

       return await this.model.create(newUser)
    } 

    async updateUser (uid, userUpdate){

       return await this.model.findOneAndUpdate({_id: uid}, userUpdate)
    }

    async deleteUSer(uid){
       return await this.model.findOneAndDelete({_id: uid})
    }


}

module.exports = User