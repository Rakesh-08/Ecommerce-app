let db = {};

db.RolesModel = require('./Roles')
db.UserModel = require('./User')

db.RolesModel.belongsToMany(db.UserModel, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",

})

db.UserModel.belongsToMany(db.RolesModel, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
})

db.Roles = ["user", "admin"]

module.exports = db;







