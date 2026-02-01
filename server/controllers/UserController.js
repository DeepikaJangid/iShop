require('dotenv').config();
const messages = require("../messages");
const UserModel = require("../models/UserModel");
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRETKEY);

const register = async (req, res) => {
    try {
        const { user_name, user_email, user_password } = req.body;
        const userExists = await UserModel.findOne({ email: user_email })
        if (userExists) {
            return res.send({
                msg: "Account Already Exists.",
                flag: 0
            })
        }
        const encryptedPassword = cryptr.encrypt(user_password);
        await UserModel.create({
            name: user_name,
            email: user_email,
            password: encryptedPassword //will use "crypter npm" for password encryption and decryption (installed in the server)
        });
        return res.send({
            msg: "Account Successfully Created.",
            flag: 1
        })
    } catch (error) {
        console.log(error.message);
        res.send(messages.catch_error);
    }
}

const login = async (req, res) => {
    try {
        const { user_email, user_password } = req.body;
        const user = await UserModel.findOne({ email: user_email })
        if (!user) {
            return res.send({
                msg: "Account Does Not Exist.",
                flag: 0
            })
        }
        const decryptedPassword = cryptr.decrypt(user.password);
        if (user_password !== decryptedPassword) {
            return res.send({
                msg: "Incorrect Password!",
                flag: 0
            })
        }
        return res.send({
            msg: "Login Successful.",
            userData: { ...user.toJSON(), password: null },
            flag: 1,
        })
    } catch (error) {
        res.send(messages.catch_error);
    }
}

module.exports = { register, login };