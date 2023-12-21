const cartModel = require("../models/carts.model")
const productModel = require("../models/product.model")

// aca debe haber algun error por que no me los metodos
class CartDaoMongo {
    constructor() {
        this.model = cartModel
    }

    async getCarts() {
        return await this.model.find().lean()
    }
    async getCartById(cid) {
     
        return await this.model.find({ _id: cid })
    }

    async createCart(newCart) {
        return await this.model.create({ products: [] })
    }

    async updateCart(cid, pid) {
        try {

            const cart = await this.model.findOne({_id:cid})
            if (!cart) {
                return 'No se encuentra el carrito'
            }

            const productIndex = cart.products.findIndex(product => product._id.equals(pid))
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += 1
            } else {
                cart.products.push({ _id: pid, quantity: 1 })
            }

            await cart.save()
            return cart

        } catch (error) {
            console.log(error)
        }
        // try {
        //     //busco el id del carrito
        //     const cartFound = await this.model.findOne({ _id: cid });
        //     //el index del producto en el carrito
        //     const prodcarIndex = cartFound.products.findIndex(
        //         (product) => product.__id == pid
        //     );

        //     if (prodcarIndex !== -1) {
        //         //si existe lo actualizo
        //         const updatedCart = await this.model.updateOne(
        //             { _id: cid, products: { $elemMatch: { _id: pid } } },
        //             { $inc: { quantity: (quantity += quantity) } }
        //         );
        //         return updatedCart;
        //     } else {
        //         //sino lo creo
        //         const prodMod = await productModel.find({ _id: pid });
        //         for (const { title, description, price } of prodMod) {
        //             const prodToAdd = {
        //                 _id: pid,
        //                 title,
        //                 description,
        //                 price,
        //                 quantity,
        //             };
        //             //y actualizo
        //             const cartUpdate = await this.model.updateOne(
        //                 { _id: cid },
        //                 { $push: { products: prodToAdd } }
        //             );
        //             return cartUpdate;
        //         }
        //     }
        // } catch (error) {
        //     console.error(error);
        // }
    };

    async deleteCart(cid) {
        return await this.model.deleteOne({ _id: cid })
    }
}

module.exports = CartDaoMongo