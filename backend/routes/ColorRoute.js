const express = require('express');
const { getData } = require('../controllers/ColorController');

const ColorRouter = express.Router();

colorRouter.get(
    "/",
    getData()
)

colorRouter.post(
    "/create",
    createData()
)

module.exports = ColorRouter;