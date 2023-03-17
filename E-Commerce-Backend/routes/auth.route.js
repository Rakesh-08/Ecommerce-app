let express = require('express');
let expressApp = express();
let authRoute = express.Router();
let authController = require('../controller/auth.controller')


authRoute.post("/signup", authController.signup)



module.exports = authRoute;



