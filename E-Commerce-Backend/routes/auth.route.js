let express = require('express');
let expressApp = express();
let authRoute = express.Router();
let authController = require('../controller/auth.controller')
let authValidators = require('../middlewares/authRequestValidator')
expressApp.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin,Content-Type,Accept"
    )
    next();
})

authRoute.post("/signup", [authValidators.checkDuplicateUserName, authValidators.checkForValidRoles], authController.signup)
authRoute.post("/signin", authController.signin)


module.exports = authRoute;



