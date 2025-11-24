const express = require('express');
const { getData, createData, setStatus } = require('../controllers/CategoryController')

const CategoryRouter = express.Router(); //req and res ko jo handle karta hai woh router... user ke pas se req lena, user ko response lakar dena.

CategoryRouter.get(
    "/",
    getData
)

CategoryRouter.post(
    "/create",
    createData
)

CategoryRouter.patch(
    "/status/:id", //use questio (:id?) mark if id is optional, but for status to update, here id is mandatory
    setStatus
)

module.exports = CategoryRouter;