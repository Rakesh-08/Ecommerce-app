let sequelize = require('sequelize');

let sequelizeConnection = new sequelize(
    "ecomm_db",
    "root",
    "Rakesh@08",

     {
        host: "localhost",
        dialect: "mysql",
         operatorsAliases: 0,
        
         pool: {
             max: 5,
             min: 0,
             acquire: 30000,
             idle:10000
         }

        
    }
)

module.exports= sequelizeConnection