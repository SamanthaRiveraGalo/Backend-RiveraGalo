const { Router } = require("express");

const router = Router();

const ProductManager = require("../managers/productManager");

const productsService = new ProductManager("./src/mockDB/products.json");
// cargo los productos
productsService.getProducts().then(() => { });

router.get("/", async (req, res) => {

    let limit = req.query.limit;
    const returnProducts = await productsService.getProducts();

    if (limit) {
        res.status(200).json({ status: "ok", data: returnProducts.slice(0, limit) });

    } else {
        res.status(200).json({ status: "ok", data: returnProducts });
    }

});


router.get("/:pid", async (req, res) => {

    try {

        const id = parseInt(req.params.pid);
        const product = await productsService.getProductById(id);

        res.status(200).json({ status: "ok", data: product });

    } catch (error) {

        res.status(404).json({ status: "error", message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {

        const { title, description, price, thumbnails, code, stock } = req.body;
        const product = await productsService.addProduct(title, description, price, thumbnails, code, stock);

        res.status(201).json({ status: "ok", data: product });

    } catch (error) {

        res.status(400).json({ status: "error", message: error.message });
    }
});

router.put("/:pid", async (req, res) => {

    try {

        const id = parseInt(req.params.pid);
        const { title, description, price, thumbnails, code, stock } = req.body;
        const product = await productsService.updateProduct(id, title, description, price, thumbnails, code, stock);

        res.status(200).json({ status: "ok", data: product });

    } catch (error) {

        res.status(400).json({ status: "error", message: error.message });
    }
});

router.delete("/:pid", async (req, res) => {
    try {

        const id = parseInt(req.params.pid);
        await productsService.deleteProduct(id);

        res.status(200).json({ status: "ok", message: "Product deleted" });

    } catch (error) {

        res.status(400).json({ status: "error", message: error.message });

    }
});

module.exports = router;