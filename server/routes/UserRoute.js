const express = require('express');
const { register, login, } = require('../controllers/UserController');

const UserRouter = express.Router();

UserRouter.post(
    "/register", // /user/register
    register
)


UserRouter.post(
    "/login", // /user/login
    login
)

// UserRouter.post(
//     "/:id",
//     getDataById
// )

// UserRouter.patch(
//     "/status/:id",
//     setStatus
// )

// UserRouter.put(
//     "/update/:id",
//     updateData
// )

// UserRouter.delete(
//     "/delete/:id",
//     deleteData
// )

module.exports = UserRouter;