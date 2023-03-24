

module.exports = (sequelize, sequelizeConnection) => {

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

    return CategoryModel;
}


