let db = require('../model/index')

let createCart = async (req, res, next) => {
    let cost = req.body;

    try {
        await db.CartModel.create(cost || { "cost": 0 });

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

    let cartToBeUpdated = await db.CartModel.findByPk(cartId)

    if (cartToBeUpdated) {
        var productsToAdd = await db.ProductModel.findAll({
            where: {
                id: req.body.productIds,
            }
        })
    }

    if (productsToAdd) {
        await cartToBeUpdated.setProducts(productsToAdd);
        console.log('products added');

        let totalCost = 0;
        let productSelected = [];
        let products = await cartToBeUpdated.getProducts();

        for (let i = 0; i < products.length; i++) {
            totalCost = totalCost + products[i].Price;
            productSelected.push({
                id: products[i].id,
                name: products[i].ProductName,
                cost: products[i].Price,
            })
        }

        res.status(200).json({
            id: cartToBeUpdated.id,
            productSelected,
            totalCost,

        })

    }

}


let getCart = async (req, res, next) => {

    let cart = await db.CartModel.findByPk(req.params.cartId);

    let totalCost = 0;
    let productsSelected = [];

    let productsInCart = await cart.getProducts();

    for (let i = 0; i < productsInCart.length; i++) {

        totalCost += productsInCart[i].Price;
        productsSelected.push({
            id: productsInCart[i].id,
            name: productsInCart[i].ProductName,
            cost: productsInCart[i].Price,
        })
    }

    res.status(200).json({
        id: cart.id,
        productsSelected,
        totalCost
    })

}

module.exports = {
    createCart, updateCart, getCart
}


