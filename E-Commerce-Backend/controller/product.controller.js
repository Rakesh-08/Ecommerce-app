let ProductsModel = require('../model/Products')
let sequelizeConnection = require('../config/db.config')

let createProductsTable = async () => {
    await sequelizeConnection.sync({ force: true });
    console.log('products table created')
    
    insertIntoProductsTable();

}

let insertIntoProductsTable = async () => {
    await ProductsModel.bulkCreate([
        {
            ProductName: 'samsung s22',
            description: 'samsung smartphone for mid-range budget',
            categoryId:2
        },
        {
            ProductName: 'Full sleeve jacket',
            description: 'best jacket for winter',
            categoryId:1
        }, {
            ProductName: 'L.G. Television',
            description: 'L.G provides great warranty period',
            categoryId:5
        }, {
            ProductName: 'iphone 14 pro',
            description: 'style means iphone 14 pro',
            categoryId:2
        }, {
            ProductName: 'ASUS laptop',
            description: 'this is built for coders',
            categoryId:3
        }
    ])
}

let getAllProducts = async (req, res, next) => {
    let allProducts = await ProductsModel.findAll()
    res.writeHead(200, { 'content-Type': 'application/json' })
    res.write(JSON.stringify(allProducts))
    res.end()
}

let getSelectedProduct = async (req, res, next) => {
    let selctedProduct =await ProductsModel.findAll({
        where: {
            id: `${req.params.productId}`
        }
    })
    
   
    res.write(JSON.stringify(selctedProduct))
    res.end()
}

createProductsTable();
module.exports = {
    getAllProducts,
    getSelectedProduct
}










