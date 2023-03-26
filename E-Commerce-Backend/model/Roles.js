
module.exports = (sequelize, sequelizeConnection) => {


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
    return RolesModel;

}







