const messages = require("../messages");

const getData = async (req, res) => {
    try {

    } catch (error) {
        res.send(messages.catch_error);
    }
}

const createData = (req, res) => {
    try {

    } catch (error) {
        res.send(messages.catch_error);
    }
}

module.exports = { getData, createData };