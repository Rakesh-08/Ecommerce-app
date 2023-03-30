let db = require('../model/index')
let sequelizeConnection = require('../config/db.config')



let insertIntoProductsTable = async (req, res, next) => {

    await db.ProductModel.bulkCreate([


        {
            "ProductName": "samsung s22",
            "Price": 7999,
            "description": "samsung smartphone for mid-range budget",
            "categoryId": 2
        },

        {
            "ProductName": "Full sleeve jacket",
            "Price": 1500,
            "description": "best jackets for winter",
            "categoryId": 1
        },

        {
            "ProductName": "L.G. Television",
            "Price": 45000,
            "description": "LG provides great warranty services",
            "categoryId": 3
        },

        {
            "ProductName": "I-Phone 13",
            "Price": 88999,
            "description": "class means having an i phone",
            "categoryId": 2
        },

        {
            "ProductName": "ASUS laptop",
            "Price": 49999,
            "description": "Coders first choice",
            "categoryId": 5
        }
    ])

    res.status(201).send('products added in the table')
    res.end()
}

let getAllProducts = async (req, res, next) => {
    let productsForCategory = req.query.categoryId;
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;
    let searchedProducts;
    if (Object.keys(req.query).length === 0) {
        searchedProducts = await db.ProductModel.findAll();
    } else if (productsForCategory) {
        searchedProducts = await db.ProductModel.findAll({
            where: {
                [db.sequelize.Op.and]: [
                    {
                        categoryId: productsForCategory
                    },
                    {
                        price: {

                            [db.sequelize.Op.lte]: maxPrice || Number.MAX_VALUE,
                            [db.sequelize.Op.gte]: minPrice || 0

                        }
                    }
                ]
            }
        })
    } else {
        searchedProducts = await filterByPrice(minPrice, maxPrice)
    }

    res.status(200).json({
        message: 'sucess',
        data: searchedProducts
    })
    res.end()
}


let filterByPrice = async (minPrice, maxPrice) => {
    let productInRange = await db.ProductModel.findAll({
        where: {
            price: {

                [db.sequelize.Op.lte]: maxPrice || Number.MAX_VALUE,
                [db.sequelize.Op.gte]: minPrice || 0

            }
        }
    })

    return productInRange

}

let getSelectedProduct = async (req, res, next) => {
    let id = req.params.productId;


    let selctedProduct = await db.ProductModel.findByPk({
        where: {
            id: id
        }
    })

    res.status(200).json(selctedProduct)
}


let addNewProducts = async (req, res, next) => {
    let productToBeAdded = req.body;
    try {
        await db.ProductModel.bulkCreate(productToBeAdded)

        res.status(201).json(productToBeAdded)
        res.end()
    } catch (err) {
        res.status(500).json({ message: 'internal server error' })
        res.end();
    }

}

let deleteProductById = async (req, res, next) => {
    let productToBeDeleted = req.params.productId;
    let IsProductThere = await db.ProductModel.findByPk(productToBeDeleted);

    try {
        if (!IsProductThere) {
            throw new Error("Category not found")
        }
        await db.ProductModel.destroy({
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


    if (!contentToBeUpdated.Price) {
        res.status(400).json({
            message: 'please provide valid input'
        })
        return;
    }

    try {

        await db.ProductModel.update(contentToBeUpdated, {
            where: {
                id: id
            }
        })
        let updatedProduct = await db.ProductModel.findByPk(id);
        res.send(updatedProduct).status(200);
        res.end();
    } catch (err) {
        next(err)
    }
}

module.exports = {

    getAllProducts,
    getSelectedProduct,
    addNewProducts,
    deleteProductById,
    updateProductById, insertIntoProductsTable
}










