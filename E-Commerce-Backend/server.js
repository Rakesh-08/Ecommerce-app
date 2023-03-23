let serverConfig = require('./config/server.config');
let express = require('express');
let expressApp = express();
let router = require('./routes/index')
let bodyParser = require('body-parser');
let ErrorHandler = require('./middlewares/ErrorHandler');
let sequelizeConnection = require("./config/db.config");
let db = require("./model/index");

expressApp.use(bodyParser.json())
expressApp.use(router);
expressApp.use(ErrorHandler)

db.CategoryModel.hasMany(db.ProductModel);

let initDb = async () => {
    await sequelizeConnection.sync({ force: true });

    insertIntoCategoryTable();
    insertRoles();
};


let insertIntoCategoryTable = async () => {
    await db.CategoryModel.bulkCreate([
        { name: "Fashion" },
        { name: "Mobiles" },
        { name: "Electronics" },
        { name: "Furniture" },
        { name: "Appliances" },
    ]);
};

let insertRoles = async () => {
    await db.RolesModel.bulkCreate([{
        id: 1,
        name: "user",
    }, {
        id: 2,
        name: 'admin'
    }])
}



expressApp.listen(serverConfig.PORT, () => {
    console.log('server is running at port ' + serverConfig.PORT)
    initDb();
})



