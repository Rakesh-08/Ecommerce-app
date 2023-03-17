let sequelize = require('sequelize')
let sequelizeConnection = require('../config/db.config')

const UserModel = sequelizeConnection.define("users", {
    username: {
        type: sequelize.DataTypes.STRING,
    },
    email: {
        type: sequelize.DataTypes.STRING
    },
    password: {
        type: sequelize.DataTypes.STRING
    }
})

module.exports = UserModel;







