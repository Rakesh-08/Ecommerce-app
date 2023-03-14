let express = require('express')
let productsRouter = express.Router();
let productController = require('../controller/product.controller')
let productsValidators = require("../middlewares/ProductRequestValidaters")

productsRouter.get("/", productController.getAllProducts)

productsRouter.get("/:productId", [productsValidators.validateReqForProductsId], productController.getSelectedProduct);

productsRouter.post("/", [productsValidators.validateReqForProductName], productController.addNewProducts);

productsRouter.delete("/:productId", [productsValidators.validateReqForProductsId], productController.deleteProductById)

productsRouter.put("/:productId", [productsValidators.validateReqForProductsId, productsValidators.validateReqForProductName], productController.updateProductById)



module.exports = productsRouter;