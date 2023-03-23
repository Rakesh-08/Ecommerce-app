let db = require("../model/index")


let getAllCategories = async (req, res, next) => {
  let categories = await db.CategoryModel.findAll();
  res.writeHead(200, { "content-Type": "application/json" });
  res.write(JSON.stringify(categories));
  res.end();
};

let getCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;


  let newCategory = await db.CategoryModel.findAll({
    where: {
      id: id,
    },
  });
  res.writeHead(200, { "content-Type": "application/json" });
  res.write(JSON.stringify(newCategory));

  res.end();
};



let addNewCategory = async (req, res, next) => {
  let categoryToBeAdded = req.body;

  await db.CategoryModel.bulkCreate(categoryToBeAdded);

  res.status(201).send("new category added successfully");
  res.end();
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
  let id = req.params.categoryId;
  let contentToBeUpdated = req.body;


  try {

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
