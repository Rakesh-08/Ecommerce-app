const { UserModel, RolesModel } = require("../model/index");
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs')



let signup = async (req, res) => {
    let user = await UserModel.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hasSync(req.body.password, 8)
    })
}

let signin = async (req, res) => {

}


module.exports = {
    signup,
    signin
}

