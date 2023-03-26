let db = require("../model/index")


let getAllCategories = async (req, res, next) => {

  try {
    let categories = await db.CategoryModel.findAll();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).send('some internal error occurred')
  }

};

let getCategoryById = async (req, res, next) => {

  try {
    let id = req.params.categoryId;
    let newCategory = await db.CategoryModel.findOne({
      where: {
        id: id,
      },
    });

    res.status(200).json(newCategory)


  } catch (err) {
    res.status(400).json({
      message: 'internal error'
    })
  }
};



let addNewCategory = async (req, res, next) => {
  try {
    let categoryToBeAdded = req.body;

    await db.CategoryModel.bulkCreate(categoryToBeAdded);

    res.status(201).send(categoryToBeAdded);
  } catch (err) {
    res.status(400).send('internal error occurred')
  }
};

let deleteCategoryById = async (req, res, next) => {
  let CategoryidToBeDeleted = req.params.categoryId;

  await db.CategoryModel.destroy({
    where: {
      id: CategoryidToBeDeleted,
    },
  });

  res.status(200).send("Above category is removed");
  res.end();
};

let updateCategoryById = async (req, res, next) => {

  try {
    let id = req.params.categoryId;
    let contentToBeUpdated = req.body;



    // if (!contentToBeUpdated.name) {
    //   res.status(500).send('please pass the data for category to be updated')
    //   res.end();

    // }

    await db.CategoryModel.update(contentToBeUpdated, {
      where: {
        id: id
      }
    });

    let updatedCategory = await db.CategoryModel.findByPk(id);
    res.send(updatedCategory).status(200);
    res.end()

  } catch (err) {
    next(err)

  }



};

let CrudOnCategories = {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  deleteCategoryById,
  updateCategoryById,
}

module.exports = CrudOnCategories;
