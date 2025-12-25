const express = require('express');
const { getData, createData, setStatus, deleteData, getDataById, updateData, uploadOtherImages } = require('../controllers/ProductController');
const FileUpload = require('express-fileupload');

const ProductRouter = express.Router();

ProductRouter.get(
    "/",
    getData
)

ProductRouter.get(
    "/:id",
    getDataById
)

ProductRouter.post(
    "/create",
    FileUpload({ createParentPath: true }), //middleware for image in the add category form.
    // by using createParentPath we get a .mv function which lets us move image file from one place to another
    createData
)

ProductRouter.post(
    "/add-other-images",
    FileUpload({ createParentPath: true }),
    uploadOtherImages
)

ProductRouter.patch(
    "/status/:id",
    setStatus
)

ProductRouter.delete(
    "/delete/:id",
    deleteData
)

ProductRouter.put(
    "/update/:id",
    FileUpload({ createParentPath: true }),
    updateData
)

module.exports = ProductRouter;