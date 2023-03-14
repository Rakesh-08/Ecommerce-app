let ProductsModel = require('../model/Products')
let sequelizeConnection = require('../config/db.config')
let sequelize = require('sequelize')


let insertIntoProductsTable = async (req, res, next) => {

    await ProductsModel.bulkCreate([


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
        searchedProducts = await ProductsModel.findAll();
    } else if (productsForCategory) {
        searchedProducts = await ProductsModel.findAll({
            where: {
                [sequelize.Op.and]: [
                    {
                        categoryId: productsForCategory
                    },
                    {
                        price: {

                            [sequelize.Op.lte]: maxPrice || Number.MAX_VALUE,
                            [sequelize.Op.gte]: minPrice || 0

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
    let productInRange = await ProductsModel.findAll({
        where: {
            price: {

                [sequelize.Op.lte]: maxPrice || Number.MAX_VALUE,
                [sequelize.Op.gte]: minPrice || 0

            }
        }
    })

    return productInRange

}

let getSelectedProduct = async (req, res, next) => {
    let id = req.params.productId;


    let selctedProduct = await ProductsModel.findAll({
        where: {
            id: id
        }
    })

    res.writeHead(200, { 'content-Type': 'application/json' })
    res.write(JSON.stringify(selctedProduct))
    res.end()
}


let addNewProducts = async (req, res, next) => {
    let productToBeAdded = req.body;

    await ProductsModel.bulkCreate(
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


    if (!contentToBeUpdated.price) {
        res.status(400).send({
            message: 'please provide valid input'
        })
        return;
    }

    try {

        await ProductsModel.update(contentToBeUpdated, {
            where: {
                id: id
            }
        })
        let updatedProduct = await ProductsModel.findByPk(id);
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










