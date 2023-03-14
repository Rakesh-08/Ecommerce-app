let serverConfig = require('./config/server.config');
let express = require('express');
let expressApp = express();
let router = require('./routes/index')
let bodyParser = require('body-parser');
let ErrorHandler = require('./middlewares/ErrorHandler');
let sequelizeConnection = require("./config/db.config");
let CategoryModel = require("./model/Category.js")
let ProductsModel = require("./model/Products")


expressApp.use(bodyParser.json())
expressApp.use(router);
expressApp.use(ErrorHandler)

CategoryModel.hasMany(ProductsModel);

let initDb = async () => {
    await sequelizeConnection.sync({ force: true });

    insertIntoCategoryTable();
};


let insertIntoCategoryTable = async () => {
    await CategoryModel.bulkCreate([
        { name: "Fashion" },
        { name: "Mobiles" },
        { name: "Electronics" },
        { name: "Furniture" },
        { name: "Appliances" },
    ]);
};



expressApp.listen(serverConfig.PORT, () => {
    console.log('server is running at port ' + serverConfig.PORT)
    initDb();
})



