let CategoryModel = require('../model/Category')
let sequelizeConnection = require('../config/db.config');


let createCategoryTable = async () => {
    await sequelizeConnection.sync({ force: true });

    insertIntoCategoryTable();
}

let insertIntoCategoryTable = async () => {
    await CategoryModel.bulkCreate([
        { name: 'Fashion' },
        { name: 'Mobiles' },
        { name: 'Electronics' },
        { name: 'Furniture' },
        { name: 'Appliances' },
    ])
}

let getAllCategories = async (req, res, next) => {
    let categories = await CategoryModel.findAll()
    res.writeHead(200, { 'content-Type': 'application/json' })
    res.write(JSON.stringify(categories))
    res.end();
}

let getCategoryById = async (req, res, next) => {

    let id = req.params.categoryId;
    if (!id) {
        res.status(400).send("ID not passed")
        return
    }

    let newCategory = await CategoryModel.findAll({
        where: {
            id: id
        }
    })
    res.writeHead(200, { 'content-Type': 'application/json' })
    res.write(JSON.stringify(newCategory))
    res.end()
}

//createCategoryTable();


let addNewCategory = async (req, res, next) => {
    let categoryToBeAdded = req.body.name

    await CategoryModel.create({
        name: categoryToBeAdded
    })

    res.status(201).send('new category added successfully')
    res.end()
}


let deleteCategoryById = async (req, res, next) => {
    let CategoryidToBeDeleted = req.params.categoryId
    
    await CategoryModel.destroy({
        where: {
            id:CategoryidToBeDeleted
        }
    })

    res.status(200).send('Above category is removed')
    res.end()
}


module.exports = { getAllCategories, getCategoryById, addNewCategory , deleteCategoryById }
