const messages = require("../messages");
const ColorModel = require("../models/ColorModel");

const getData = async (req, res) => {
    try {
        const colors = await ColorModel.find();
        res.send(
            {
                msg: "Colors Data",
                flag: 1,
                colors,
            }
        )
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const getDataById = async (req, res) => {
    try {
        const id = req.params.id;
        const color = await ColorModel.findById({ _id: id });
        res.send(
            {
                msg: "Color Data",
                flag: 1,
                color
            }
        )
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const createData = async (req, res) => {
    try {
        const { color_name, color_code, color_slug } = req.body
        const colorExists = await ColorModel.findOne({ name: color_name });
        if (!colorExists) {
            await ColorModel.create(
                {
                    name: color_name,
                    slug: color_slug,
                    code: color_code,
                }
            )
            res.send(messages.created);
        } else {
            res.send(messages.name_already_exists);
        }
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const setStatus = async (req, res) => {
    try {
        const objKey = {};
        const id = req.params.id;
        const statusType = req.body.statusType;
        const colorExists = await ColorModel.findById(id);

        if (colorExists) {
            if (statusType === "status") {
                objKey.status = !colorExists.status;
                res.send({
                    msg: `Category ${statusType[0].toUpperCase() + statusType.slice(1)} Updated.`,
                    flag: 1
                })
            }
            await ColorModel.findByIdAndUpdate(
                { _id: id }, objKey
            );

        } else {
            res.send(messages.data_doesnot_exist);
        }
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const updateData = async (req, res) => {
    try {
        const id = req.params.id;
        const { color_name, color_slug, color_code } = req.body;
        const colorExists = await ColorModel.findById(id);
        if (!colorExists) return res.send(messages.data_doesnot_exist);
        const update = {};
        if (color_name) update.name = color_name;
        if (color_slug) update.slug = color_slug;
        if (color_code) update.code = color_code;

        console.log(update);
        await ColorModel.findByIdAndUpdate(id, { $set: update })
        res.send(messages.data_updated);
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const deleteData = async (req, res) => {
    try {
        const id = req.params.id;
        const colorExists = await ColorModel.findById(id);
        if (!colorExists) return res.send(messages.data_doesnot_exist);
        await ColorModel.findByIdAndDelete({ _id: id });
        res.send(messages.data_deleted);
    } catch (error) {
        res.send(messages.catch_error)
    }
}



module.exports = { getData, getDataById, createData, setStatus, updateData, deleteData };