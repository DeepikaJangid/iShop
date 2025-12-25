const express = require('express');
const { getData, createData, getDataById, setStatus, updateData, deleteData } = require('../controllers/ColorController');

const ColorRouter = express.Router();

ColorRouter.get(
    "/",
    getData
)

ColorRouter.get(
    "/:id",
    getDataById
)

ColorRouter.post(
    "/create",
    createData
)

ColorRouter.patch(
    "/status/:id",
    setStatus
)

ColorRouter.put(
    "/update/:id",
    updateData
)

ColorRouter.delete(
    "/delete/:id",
    deleteData
)

module.exports = ColorRouter;