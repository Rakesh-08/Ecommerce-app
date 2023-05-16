const serverConfig = require('./config/server.config');
const expressApp = require('./app')


expressApp.listen(serverConfig.PORT, () => {
    console.log('server will be run by Rakesh at port :  ' + serverConfig.PORT)

})



