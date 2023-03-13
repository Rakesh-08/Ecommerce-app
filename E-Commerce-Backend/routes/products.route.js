let express = require('express')
let productsRouter = express.Router();
let productController = require('../controller/product.controller')
let productsValidators = require("../middlewares/ProductRequestValidaters")

productsRouter.get("/", productController.getAllProducts)

productsRouter.get("/:productId", productController.getSelectedProduct);

productsRouter.post("/", productController.addNewProduct);

productsRouter.delete("/:productId", productController.deleteProductById)

productsRouter.put("/:productId", productController.updateProductById)



module.exports = productsRouter;