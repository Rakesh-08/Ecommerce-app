
const developmentInstance = {
    DB: "ecomm_db",
    USER: "root",
    PASSWORD: "Rakesh@08",
    HOST: "0.0.0.0",
    dialect: "mysql",
    operatorAliases: 0,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }


}

const testInstance = {
    DB: "ecomm_test_db",
    USER: "root",
    PASSWORD: "Rakesh@08",
    HOST: "localhost",
    dialect: "mysql",
    operatorAliases: 0,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }

};

module.exports = {
    development: developmentInstance,
    test: testInstance,
}

