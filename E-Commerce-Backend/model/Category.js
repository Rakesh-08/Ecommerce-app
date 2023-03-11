let sequelize = require('sequelize');
let sequelizeConnection = require('../config/db.config')

let CategoryModel = sequelizeConnection.define("categories", {
    id: {
        primaryKey: true,
        notNull: true,
        type: sequelize.DataTypes.INTEGER,
        autoIncrement: true
    },
    name: {
        notNull: true,
        type: sequelize.DataTypes.STRING
    }
}, {
    timestamps: false
}
)

module.exports = CategoryModel;


