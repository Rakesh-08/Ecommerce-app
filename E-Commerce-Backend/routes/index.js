let express = require('express');
let router = express.Router();
let categoriesRoute = require('./categories.route')
let productesRoute = require('./products.route')

router.get("/", (req, res, next) => {
    res.write('This is home page of app');
    res.end()

})

router.use('/categories', categoriesRoute);
router.use('/products', productesRoute)


module.exports = router;

