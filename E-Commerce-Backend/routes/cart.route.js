
let express = require('express')
let cartRouter = express.Router();
let cartController = require('../controller/cart.controller')
let authJwt = require('../middlewares/auth.jwt')


cartRouter.get('/:cartId', [authJwt.verifyToken], cartController.getCart)
cartRouter.post('/', [authJwt.verifyToken], cartController.createCart)

cartRouter.put('/:cartId', [authJwt.verifyToken], cartController.updateCart)



module.exports = cartRouter;


