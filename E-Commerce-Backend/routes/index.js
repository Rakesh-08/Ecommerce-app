let express = require('express'); 
let router = express.Router();
let categoryController = require("../controller/category.controller");
let productController = require('../controller/product.controller')


router.get("/", (req, res, next) => {
   res.write('This is home page of app');
    res.end()
    
})


router.get("/categories",categoryController.getAllCategories  )


router.get("/categories/:categoryId",categoryController.getCategoryById )


router.get("/products",productController.getAllProducts )


router.get("/products/:productId", productController.getSelectedProduct)



module.exports = router;