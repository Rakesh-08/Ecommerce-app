const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config')

const verifyToken = (req, res, next) => {

    let token = req.headers["x-access-token"];
    if (!token) {
        res.status(401).json({
            message: "Invalid Token"
        })
        return;
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            res.status(401).json({
                message: "Unauthorised"
            })
            return;
        }

        req.userId = decoded.id;
        next();



    })

}


module.exports = {
    verifyToken,
}

