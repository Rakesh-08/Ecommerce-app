let express = require('express');
let router = express.Router();
let categoriesRoute = require('./categories.route')
let productsRoute = require('./products.route')
let authRoute = require('./auth.route')
let cartRoute = require('./cart.route')


router.get("/", (req, res, next) => {
    res.write('This is home page of app');
    res.end()

})

router.use('/ecomm/api/v1/categories', categoriesRoute);
router.use('/ecomm/api/v1/products', productsRoute)
router.use('/ecomm/api/v1/auth', authRoute)
router.use('/ecomm/api/v1/cart', cartRoute)
module.exports = router;

