let express = require("express");
let categoriesRouter = express.Router();
let categoryController = require("../controller/category.controller");
let categoryValidaters = require('../middlewares/CategoryRequestValidaters')

// base route for this file is /categories meaning the  "/" route => "/categories"

categoriesRouter.get("/", categoryController.getAllCategories);

categoriesRouter.get("/:categoryId", [categoryValidaters.validateReqForCategoryId], categoryController.getCategoryById);

categoriesRouter.post("/", [categoryValidaters.validateReqForCategoryName], categoryController.addNewCategory);

categoriesRouter.delete("/:categoryId", [categoryValidaters.validateReqForCategoryId], categoryController.deleteCategoryById)

categoriesRouter.put("/:categoryId", [categoryValidaters.validateReqForCategoryId, categoryValidaters.validateReqForCategoryName], categoryController.updateCategoryById)

module.exports = categoriesRouter;
