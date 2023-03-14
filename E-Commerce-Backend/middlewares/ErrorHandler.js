let path = require('path')

const ErrorHandler = (err, req, res, next) => {
    console.log('Middleware Error Handling')
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';

    // res.status(errStatus).json({
    //     sucess: false,
    //     status: errStatus,
    //     message:errMsg
    // })
    let filePath = __dirname + "/../views//Error.html";

    res.sendFile(path.join(filePath))


}



module.exports = ErrorHandler;