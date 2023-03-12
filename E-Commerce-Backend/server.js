let serverConfig = require('./config/server.config');
let express = require('express');
let expressApp = express();
let router = require('./routes/index')
let bodyParser = require('body-parser');
let ErrorHandler = require('./middlewares/ErrorHandler')

expressApp.use(bodyParser.json())


expressApp.use(router);
expressApp.use(ErrorHandler)


expressApp.listen(serverConfig.PORT, () => {
    console.log('server is running at port ' + serverConfig.PORT)
})



