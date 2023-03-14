let ProductsModel = require('../model/Products')
let commonValidators = require('./commonValidaters')

let validateReqForProductName = (req, res, next) => {
    commonValidators.validateReqForName(req, res, next, 'products')
}

let validateReqForProductsId = async (req, res, next) => {
    let productId = req.params.productId;

    await commonValidators.validateReqForId(productId, ProductsModel, res, next, 'products')

}
module.exports = { validateReqForProductName, validateReqForProductsId }