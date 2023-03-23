let sequelize = require('sequelize');
let sequelizeConnection = require('../config/db.config');

let CartModel = sequelizeConnection.define('cart', {
    id: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cost: {
        type: sequelize.DataTypes.DECIMAL

    }
},
    {
        timestamps: false
    });

module.exports = CartModel;






