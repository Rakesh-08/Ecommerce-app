
module.exports = (sequelize, sequelizeConnection) => {

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

    return CartModel;
}






