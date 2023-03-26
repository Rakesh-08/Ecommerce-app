let CategoryModel = require('../model/Category');
let commonValidators = require('./commonValidaters')



const validateReqForCategoryName = (req, res, next) => {
    commonValidators.validateReqForName(req, res, next, 'category')
}

const validateReqForCategoryId = async (req, res, next,) => {
    let categoryId = req.params.categoryId;
    await commonValidators.validateReqForId(categoryId, CategoryModel, res, next, 'category')
}

module.exports = {
    validateReqForCategoryName,
    validateReqForCategoryId,

}