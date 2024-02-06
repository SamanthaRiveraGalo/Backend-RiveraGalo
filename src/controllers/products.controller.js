const ProductDaoMongo = require("../dao/managerMongo/productManagerMongo");

class ProductController {

    constructor() {

        this.productServiceMongo = new ProductDaoMongo()
    }

    getsProducts = async (req, res) => {

        try {

            const limit = req.query.limit;
            const page = req.query.page;
            const query = req.query;

            const products = await this.productServiceMongo.getProducts(limit, page, query)

            res.status(200).send({ status: "Success", payload: products });


        } catch (error) {
            console.log(error)
        }

    }

    getProductId = async (req, res) => {

        try {

            const pid = req.params.pid;
            const product = await this.productServiceMongo.getProductById(pid)

            if (!product) {
                return res.status(404).send({ status: "Error", error: "producto para id no encontrado", });
            }

            return res.status(200).send({ status: "Success", payload: product });

        } catch (error) {
            console.log(error)
        }

    }

    createProduct = async (req, res) => {

        try {

            const { title, description, code, price, thumbnails, stock, category } = req.body;

            const newProduct = {
                title,
                description,
                code,
                price,
                stock,
                thumbnails,
                category,
            };

            const result = await this.productServiceMongo.createProduct(newProduct);

            if (!result) {
                return res.status(400).send({ status: "Error", error: "El producto no se agrego", });
            }

            return res.status(201).send({ status: "Success", payload: result, })

        } catch (error) {
            console.log(error)
        }

    }

    updateProduct = async (req, res) => {
        try {
            const productToUpdate = req.body
            const pid = req.params.pid

            const updateProduct = await this.productServiceMongo.updateProduct(pid, productToUpdate);
            if (!updateProduct) {

                return res.status(400).send({
                    status: "Error",
                    error: "el producto no se pudo actualizar",
                });

            }
            return res.status(200).send({
                status: "Success",
                payload: updateProduct,
            });

        } catch (error) {
            console.log(error)
        }

    }

    deleteProduct = async (req, res) => {
        try {

            const id = req.params.pid;

            const deletedProduct = await this.productServiceMongo.deleteProduct(id);

            if (deletedProduct) {
                return res.status(200).send({
                    status: "Success",
                    payload: deletedProduct,
                });
            }

            return res.status(404).send({ status: "Error", error: "producto para eliminar no encontrado", });

        } catch (error) {
            console.log(error)
        }

    }

}

module.exports = ProductController