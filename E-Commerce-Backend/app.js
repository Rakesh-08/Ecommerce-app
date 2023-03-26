
let express = require('express');
let expressApp = express();
let router = require('./routes/index')
let bodyParser = require('body-parser');
let ErrorHandler = require('./middlewares/ErrorHandler');
let db = require("./model/index");

expressApp.use(bodyParser.json())
expressApp.use(router);
expressApp.use(ErrorHandler)

db.CategoryModel.hasMany(db.ProductModel);

db.sequelizeConnection.sync({ force: true }).then(() => {
    initDb();
})

let initDb = async () => {
    await insertIntoCategoryTable();
    await insertRoles();
};


let insertIntoCategoryTable = () => {
    db.CategoryModel.bulkCreate([
        { name: "Fashion" },
        { name: "Mobiles" },
        { name: "Electronics" },
        { name: "Furniture" },
        { name: "Appliances" },
    ])
}

let insertRoles = () => {
    db.RolesModel.bulkCreate([{
        id: 1,
        name: "user",
    }, {
        id: 2,
        name: 'admin'
    }])
}

module.exports = expressApp;

