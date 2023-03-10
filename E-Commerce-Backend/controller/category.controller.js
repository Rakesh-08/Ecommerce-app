let CategoryModel = require('../model/Category')
let sequelizeConnection = require('../config/db.config');


let createCategoryTable = async () => {
    await sequelizeConnection.sync({force:true});

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
    let newCategory = await CategoryModel.findAll({
        where: {
            id: `${req.params.categoryId}`
        }
    })
   
    res.send(JSON.stringify(newCategory)).
    res.end();
}

createCategoryTable();


module.exports= { getAllCategories, getCategoryById}
