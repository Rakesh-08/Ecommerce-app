const sequelize = require('sequelize');
const env = process.env.NODE_ENV || "development";
const dbConfig = require('../config/db.config')[env];

let db = {};

db.sequelize = sequelize;

db.sequelizeConnection = new sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,

    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }


    }
)

db.RolesModel = require('./Roles')(sequelize, db.sequelizeConnection)
db.UserModel = require('./User')(sequelize, db.sequelizeConnection);
db.CartModel = require('./Cart')(sequelize, db.sequelizeConnection);
db.ProductModel = require('./Products')(sequelize, db.sequelizeConnection)
db.CategoryModel = require('./Category')(sequelize, db.sequelizeConnection)


db.UserModel.belongsToMany(db.RolesModel, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.RolesModel.belongsToMany(db.UserModel, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",

})

db.ProductModel.belongsToMany(db.CartModel, {
    through: "cart_products",
    forignKey: "productId",
    otherKey: "cartId",
})

db.CartModel.belongsToMany(db.ProductModel, {
    through: "cart_products",
    forignKey: "cartId",
    otherKey: "productId",
})

db.Roles = ["user", "admin"]

module.exports = db;







