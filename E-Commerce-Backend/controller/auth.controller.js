const { UserModel, RolesModel } = require("../model/index");
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let sequelize = require('sequelize')
let authConfig = require('../config/auth.config');



let signup = async (req, res) => {
    let user = await UserModel.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    if (req.body.roles.length !== 0) {
        var roles = await RolesModel.findAll({
            where: {
                name: {
                    [sequelize.Op.or]: req.body.roles,
                }
            }
        })


        await user.setRoles(roles);
        res.status(200).json({
            message: " user registered successfully"
        })
    } else {
        await user.setRoles([1]);
        res.status(200).json({
            message: "user registered with default role"
        })

    }

}

let signin = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let existingUser = await UserModel.findOne({
        where: {
            username: username,
        }
    })

    if (!existingUser) {
        res.status(400).json({
            message: "User not found"
        })
        return;
    };

    let IsValidPassword = bcrypt.compareSync(
        req.body.password,
        existingUser.password
    )

    if (!IsValidPassword) {
        res.status(401).json({
            message: "Incorrect password"
        })
        return;
    }

    let token = jwt.sign({ id: existingUser.id }, authConfig.secret, {
        expiresIn: 85458
    })

    let authorities = [];
    let roles = await existingUser.getRoles();
    for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase())
    }

    res.status(200).send({
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        roles: authorities,
        accessToken: token

    })





}


module.exports = {
    signup,
    signin
}

