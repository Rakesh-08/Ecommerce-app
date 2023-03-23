let sequelize = require('sequelize')
let db = {};

db.sequelize = sequelize;

db.RolesModel = require('./Roles')
db.UserModel = require('./User')
db.CartModel = require('./Cart');
db.ProductModel = require('./Products');
db.CategoryModel = require('./Category')


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







