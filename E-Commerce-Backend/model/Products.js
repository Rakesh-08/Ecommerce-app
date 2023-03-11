let sequelize = require('sequelize');
let sequelizeConnection = require('../config/db.config');


let ProductsModel = sequelizeConnection.define(
    'Products', {
    id: {
        type: sequelize.DataTypes.BIGINT,
        notNull: true,
        autoIncrement: true,
        primaryKey: true
    },
    ProductName: {
        type: sequelize.DataTypes.STRING,
        notNull: true,

    },
    Price: {
        notNull: true,
        type: sequelize.DataTypes.INTEGER
    },
    description: {
        type: sequelize.DataTypes.STRING,
        notNull: true,

    },
    categoryId: {
        type: sequelize.DataTypes.INTEGER,
        notNull: true,
        foreignKey: true
    }

},
    {
        timestamps: false
    }
)


module.exports = ProductsModel;