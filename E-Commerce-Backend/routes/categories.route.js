let express = require("express");
let categoriesRouter = express.Router();
let categoryController = require("../controller/category.controller");


// base route for this file is /categories meaning the  / route means /categories

categoriesRouter.get("/", categoryController.getAllCategories);

categoriesRouter.get("/:categoryId", categoryController.getCategoryById);

categoriesRouter.post("/", categoryController.addNewCategory);

categoriesRouter.delete("/:categoryId", categoryController.deleteCategoryById)

categoriesRouter.put ("/:categoryId", categoryController.updateCategoryById)

module.exports = categoriesRouter;
