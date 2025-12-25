const express = require('express');
const { getData, createData, setStatus, updateData, getBrandById, deleteData } = require('../controllers/BrandController');
const fileUpload = require('express-fileupload');
const BrandRouter = express.Router();

BrandRouter.get(
    "/",
    getData
)

BrandRouter.post(
    "/create",
    fileUpload({ createParentPath: true }),
    createData
)

BrandRouter.patch(
    "/status/:id",
    setStatus
)

BrandRouter.get(
    "/:id",
    getBrandById
)

BrandRouter.put(
    "/update/:id",
    fileUpload({ createParentPath: true }),
    updateData
)

BrandRouter.delete(
    "/delete/:id",
    deleteData
)

module.exports = BrandRouter;