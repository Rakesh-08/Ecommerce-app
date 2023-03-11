let express = require('express')
let productsRouter = express.Router();
let productController = require('../controller/product.controller')

productsRouter.get("/", productController.getAllProducts)


productsRouter.get("/:productId", productController.getSelectedProduct)




module.exports = productsRouter;