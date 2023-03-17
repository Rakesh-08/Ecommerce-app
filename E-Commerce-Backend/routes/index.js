let express = require('express');
let router = express.Router();
let categoriesRoute = require('./categories.route')
let productesRoute = require('./products.route')
let authRoute = require('./auth.route')
router.get("/", (req, res, next) => {
    res.write('This is home page of app');
    res.end()

})

router.use('/ecomm/api/v1/categories', categoriesRoute);
router.use('/ecomm/api/v1/products', productesRoute)
router.use('/ecomm/api/v1/auth', authRoute)

module.exports = router;

