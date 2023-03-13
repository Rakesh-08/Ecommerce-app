let CategoryModel = require("../model/Category");
let sequelizeConnection = require("../config/db.config");

let createCategoryTable = async () => {
  await sequelizeConnection.sync({ force: true });

  insertIntoCategoryTable();
};

let insertIntoCategoryTable = async () => {
  await CategoryModel.bulkCreate([
    { name: "Fashion" },
    { name: "Mobiles" },
    { name: "Electronics" },
    { name: "Furniture" },
    { name: "Appliances" },
  ]);
};

let getAllCategories = async (req, res, next) => {
  let categories = await CategoryModel.findAll();
  res.writeHead(200, { "content-Type": "application/json" });
  res.write(JSON.stringify(categories));
  res.end();
};

let getCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;


  let newCategory = await CategoryModel.findAll({
    where: {
      id: id,
    },
  });
  res.writeHead(200, { "content-Type": "application/json" });
  res.write(JSON.stringify(newCategory));

  res.end();
};

//createCategoryTable();

let addNewCategory = async (req, res, next) => {
  let categoryToBeAdded = req.body;

  await CategoryModel.create(categoryToBeAdded);

  res.status(201).send("new category added successfully");
  res.end();
};

let deleteCategoryById = async (req, res, next) => {
  let CategoryidToBeDeleted = req.params.categoryId;

  await CategoryModel.destroy({
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

    await CategoryModel.update(contentToBeUpdated, {
      where: {
        id: id
      }
    });

    let updatedCategory = await CategoryModel.findByPk(id);
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
