const { Router } = require("express");
const ProductController = require("../../controllers/products.controller");

const {
    getsProducts,
    getProductId,
    createProduct,
    updateProduct,
    deleteProduct
} = new ProductController()

const router = Router();


router.get("/", getsProducts);

router.get("/:pid", getProductId);

router.post("/", createProduct);

router.put("/:pid", updateProduct);

router.delete("/:pid", deleteProduct);

module.exports = router;