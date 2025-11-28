const express = require('express');
const { getData, createData, setStatus, deleteData, getDataById, updateData } = require('../controllers/CategoryController');
const FileUpload = require('express-fileupload');
//for image input in the add category form
const CategoryRouter = express.Router(); //req and res ko jo handle karta hai woh router... user ke pas se req lena, user ko response lakar dena.

CategoryRouter.get(
    "/",
    getData
)

CategoryRouter.get(
    "/:id",
    getDataById
)

CategoryRouter.post(
    "/create",
    FileUpload({ createParentPath: true }), //middleware for image in the add category form.
    // by using createParentPath we get a .mv function which lets us move image file from one place to another
    createData
)

CategoryRouter.patch(
    "/status/:id", //use questio (:id?) mark if id is optional, but for status to update, here id is mandatory
    setStatus
)

CategoryRouter.delete(
    "/delete/:id",
    deleteData
)

CategoryRouter.put(
    "/update/:id",
    FileUpload({ createParentPath: true }),
    updateData
)



module.exports = CategoryRouter;