const cartModel = require("../models/carts.model")

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

    async AddProductToCart(cid, pid) {
        try {

            const cart = await this.model.findOne({ _id: cid })
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
    };
    //revisar
    async updateCart(cid, prods) {
        try {

            const updatedCart = await this.model.findOneAndUpdate(
                { _id: cid },
                { product: prods },
                { new: true }
            );

            return updatedCart;

        } catch (error) {
            console.log(error)
        }

    }
    //revisar
    async updateQuantity(cid, pid, quantity) {
        try {

            const cart = await this.model.findOne({ _id: cid });

            if (!cart) {
                console.log('carrito no encontrado')
            }

            const productToUpdate = cart.products.find(product => product._id === pid);

            if (!productToUpdate) {
                console.log('producto no encontrado')
            }

            productToUpdate.quantity = quantity;
            await cart.save();
            return cart;

        } catch (error) {
            console.error(error);
        }
    }

    deleteAllProducts = async (cid) => {
        try {
            
            const cart = await this.model.findOne({ _id: cid });

          if (!cart){
            console.log('no se encontro el carrito')
          }
    
    
          cart.products = [];
    
          const updatedCart = await cart.save();
    
          return updatedCart;

        } catch (error) {
          console.log(error) ;
        }
      }

    //eliminar un producto o una cantidad del producto del carrito 
    async deleteProduct(cid, pid) {
        try {

            const cart = await this.model.findOne({ _id: cid })

            if (!cart) {
                return 'No se encuentra el producto a eliminar'
            }

            const productIndex = cart.products.findIndex(product => product._id.equals(pid))

            if (productIndex !== -1) {
                cart.products.splice(productIndex, 1);
            }


            await cart.save();
            return cart;

        } catch (error) {
            console.log(error)
        }
    }


}

module.exports = CartDaoMongo