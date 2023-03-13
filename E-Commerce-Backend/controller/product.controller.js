let ProductsModel = require('../model/Products')
let sequelizeConnection = require('../config/db.config')
let sequelize = require('sequelize')

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
    let productsForCategory = req.query.categoryId;
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;
    let searchedProducts;
    if (productsForCategory) {
        searchedProducts = await filterByCategory(productsForCategory)
    } else if (minPrice && maxPrice) {
        searchedProducts = await filterByPrice(minPrice, maxPrice)

    } else {
        searchedProducts = await ProductsModel.findAll();
    }

    res.status(200).json({
        message: 'sucess',
        data: searchedProducts
    })
    res.end()
}

let filterByCategory = async (id) => {
    let products = await ProductsModel.findAll({
        where: {
            categoryId: id
        }
    })

    return products;
}

let filterByPrice = async (minPrice, maxPrice) => {
    let productInRange = await ProductsModel.findAll({
        where: {
            price: {

                [sequelize.Op.lte]: maxPrice,
                [sequelize.Op.gte]: minPrice

            }
        }
    })

    return productInRange

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
    addNewProduct,
    deleteProductById,
    updateProductById
}










