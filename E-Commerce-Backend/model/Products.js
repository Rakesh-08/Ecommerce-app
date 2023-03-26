
module.exports = (sequelize, sequelizeConnection) => {


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

        }

    },
        {
            timestamps: false
        }
    )

    return ProductsModel;
}