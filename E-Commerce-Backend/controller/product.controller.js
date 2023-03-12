let ProductsModel = require('../model/Products')
let sequelizeConnection = require('../config/db.config')

let createProductsTable = async () => {
    await sequelizeConnection.sync({ force: true });
    console.log('products table created')
    //insertIntoProductsTable();

}

let insertIntoProductsTable = async () => {
    await ProductsModel.bulkCreate([
        {
            ProductName: 'samsung s22',
            Price: 7999,
            description: 'samsung smartphone for mid-range budget',
            categoryId: 2
        },
        {
            ProductName: 'Full sleeve jacket',
            Price: 1500,
            description: 'best jacket for winter',
            categoryId: 1
        }, {
            ProductName: 'L.G. Television',
            Price: 45000,
            description: 'L.G provides great warranty period',
            categoryId: 5
        }, {
            ProductName: 'iphone 14 pro',
            Price: 98000,
            description: 'style means iphone 14 pro',
            categoryId: 2
        }, {
            ProductName: 'ASUS laptop',
            Price: 49999,
            description: 'this is built for coders',
            categoryId: 3
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
    let id = req.params.productId;

    if (!id) {
        if (!id) {
            res.status(400).send("ID not passed")
            return
        }
    }
    let selctedProduct = await ProductsModel.findAll({
        where: {
            id: id
        }
    })

    res.writeHead(200, { 'content-Type': 'application/json' })
    res.write(JSON.stringify(selctedProduct))
    res.end()
}

//createProductsTable();

let addNewProduct = async (req, res, next) => {
    let productToBeAdded = req.body;

    await ProductsModel.create(
        productToBeAdded
    )

    res.status(201).send('product added in the table')
    res.end()

}

let deleteProductById = async (req, res, next) => {
    let productToBeDeleted = req.params.productId;
    let IsProductThere = await ProductsModel.findByPk(productToBeDeleted);

    try {
        if (!IsProductThere) {
            throw new Error("Category not found")
        }
        await ProductsModel.destroy({
            where: {
                id: productToBeDeleted
            }
        })

        res.status(200).send('product removed from table')
        res.end()
    } catch (err) {
        next(err)
    }
}

let updateProductById = async (req, res, next) => {
    let id = req.params.productId;
    let contentToBeUpdated = req.body;

    await ProductsModel.update(contentToBeUpdated, {
        where: {
            id: id
        }
    })

    res.send('product details updated').status(200);
    res.end();
}

module.exports = {

    getAllProducts,
    getSelectedProduct,
    addNewProduct,
    deleteProductById,
    updateProductById
}










