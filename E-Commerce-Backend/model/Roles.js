let sequelize = require('sequelize')
let sequelizeConnection = require('../config/db.config')

const RolesModel = sequelizeConnection.define("roles", {

    id: {
        type: sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        notNull: true
    }

}
)

module.exports = RolesModel;







