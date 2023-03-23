const { CartModel, ProductModel } = require("../model")

let createCart = async (req, res, next) => {
    let cost = req.body;

    try {
        await CartModel.create(cost);

        res.status(200).json({
            message: "Cart created "
        });
    } catch (err) {
        res.status(401).json({
            message: "some internal error happend"
        })
    }

}

let updateCart = async (req, res, next) => {
    const cartId = req.params.cartId;

    let cartToBeUpdated = await CartModel.findByPk(cartId)

    if (cartToBeUpdated) {
        let productsToAdd = await ProductModel.findAll({
            where: {
                id: req.body.productIds,
            }
        })
    }

    if (productsToAdd) {
        await cartToBeUpdated.setProductModel(productsToadd)
        console.log('products added');

        let totalCost = 0;
        let productSelected = [];
        let products = await cartToBeUpdated.getProductModel();

        for (let i = 0; i < products.length; i++) {
            totalCost = totalCost + products[i].price;
            productSelected.push({
                id: products[i].id,
                name: products[i].name,
                cost: products[i].price,
            })
        }

        res.status(200).json({
            id: cartToBeUpdated.id,
            productSelected,
            totalCost,

        })

    }

}

module.exports = { createCart, updateCart }


