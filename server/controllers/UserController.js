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

const getAddresses = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserModel.findById(userId);
        if (!user) return res.send(messages.data_doesnot_exist);

        res.send({
            flag: 1,
            msg: "Shipping addresses fetched successfully",
            shipping_address: user.shipping_address,
        });
    } catch (error) {
        res.send(messages.catch_error);
    }
};

const addAddress = async (req, res) => {
    try {
        const userId = req.params.id;
        const newAddress = req.body;

        const user = await UserModel.findById(userId);
        if (!user) return res.send(messages.data_doesnot_exist);

        user.shipping_address.push(newAddress);
        await user.save();

        res.send({
            flag: 1,
            msg: "Address added successfully",
            shipping_address: user.shipping_address,
        });
    } catch (error) {
        console.log(error);
        res.send(messages.catch_error);
    }
};

const updateAddress = async (req, res) => {
    try {
        const userId = req.params.id;
        const { index, updatedAddress } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) return res.send(messages.data_doesnot_exist);

        if (!user.shipping_address[index]) {
            return res.send({ flag: 0, msg: "Address not found" });
        }

        user.shipping_address[index] = updatedAddress;
        await user.save();

        res.send({
            flag: 1,
            msg: "Address updated successfully",
            shipping_address: user.shipping_address,
        });
    } catch (error) {
        console.log(error);
        res.send(messages.catch_error);
    }
};

const deleteAddress = async (req, res) => {
    try {
        const userId = req.params.id;
        const { index } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) return res.send(messages.data_doesnot_exist);

        if (!user.shipping_address[index]) {
            return res.send({ flag: 0, msg: "Address not found" });
        }

        user.shipping_address.splice(index, 1); //remove address at index
        await user.save();

        res.send({
            flag: 1,
            msg: "Address deleted successfully",
            shipping_address: user.shipping_address,
        });
    } catch (error) {
        console.log(error);
        res.send(messages.catch_error);
    }
};

module.exports = { register, login, getAddresses, addAddress, updateAddress, deleteAddress };