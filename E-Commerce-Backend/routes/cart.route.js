
let express = require('express')
let cartRouter = express.Router();
let cartController = require('../controller/cart.controller')

cartRouter.post('/', cartController.createCart)

cartRouter.put('/:cartId', cartController.updateCart)



module.exports = cartRouter;


