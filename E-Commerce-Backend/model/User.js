


module.exports = (sequelize, sequelizeConnection) => {
    const UserModel = sequelizeConnection.define("users", {
        username: {
            type: sequelize.DataTypes.STRING,
        },
        email: {
            type: sequelize.DataTypes.STRING,
        },
        password: {
            type: sequelize.DataTypes.STRING,
        },
    });
    return UserModel;
};










