let CategoryModel = require('../model/Category');
let validateReqForId = require('./commonValidaters')



const validateReqForCategoryName = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Category name is required"
        })
    }
    next();
}

const validateReqForCategoryId = async (req, res, next) => {
    validateReqForId(req.params.categoryId, CategoryModel, res, next)
}

module.exports = {
    validateReqForCategoryName,
    validateReqForCategoryId,

}