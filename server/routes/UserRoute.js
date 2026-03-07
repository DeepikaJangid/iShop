const express = require('express');
const { register, login, getAddresses, addAddress, updateAddress, deleteAddress } = require('../controllers/UserController');

const UserRouter = express.Router();

UserRouter.post(
    "/register", // /user/register
    register
);

UserRouter.post(
    "/login", // /user/login
    login
);

UserRouter.get(
    "/:id/addresses",
    getAddresses
);

UserRouter.post(
    "/:id/address/add",
    addAddress
);

UserRouter.put(
    "/:id/address/update",
    updateAddress
);

UserRouter.delete(
    "/:id/address/delete",
    deleteAddress
);

module.exports = UserRouter;