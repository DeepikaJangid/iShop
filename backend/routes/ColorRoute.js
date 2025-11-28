const express = require('express');
const { getData } = require('../controllers/ColorController');

const ColorRouter = express.Router();

ColorRouter.get(
    "/",
    getData()
)

ColorRouter.post(
    "/create",
    createData()
)

module.exports = ColorRouter;