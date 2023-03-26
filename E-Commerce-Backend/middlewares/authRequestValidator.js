//let sequelize = require('sequelize');
const { UserModel, RolesModel, Roles } = require("../model/index");


let checkDuplicateUserName = async (req, res, next) => {
    let user = await UserModel.findOne({
        where: {
            username: req.body.username
        }
    })

    if (user) {
        res.status(400).json({
            message: "user already exist"
        })
        return;
    }

    next();
}

let checkForValidRoles = async (req, res, next) => {

    let rolesPassed = req.body.roles;

    if (rolesPassed.length !== 0) {

        for (let i = 0; i < rolesPassed.length; i++) {

            if (!Roles.includes(rolesPassed[i])) {
                res.status(400).json({
                    message: rolesPassed[i] + " ROLE is not available for users"
                })

                return;
            }
        }

    }
    next();


}

auth = {
    checkDuplicateUserName,
    checkForValidRoles
}

module.exports = auth;













