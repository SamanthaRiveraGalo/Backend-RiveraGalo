const { MockingProducts } = require("../dao/managerMongo/mockingProducts");

class MockingController {
    constructor() {
        this.mockingService = new MockingProducts()
    }

    generateProducts = async (req, res) => {
        try {
            const products = await this.mockingService.generateProducts()

            res.status(200).send(products)

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = { MockingController }