const { generateUniqueImageName } = require('../helper/helper');
const messages = require('../messages');
const BrandModel = require('../models/BrandModel');
const fs = require('fs')

const getData = async (req, res) => {
    try {
        const brands = await BrandModel.find();
        res.send({
            msg: "All the Brands",
            flag: 1,
            brands,
            imageURL: "http://localhost:5000/images/brand/"
        })
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const createData = async (req, res) => {
    try {

        const imageFile = req.files.brand_image;
        const { brand_name, brand_slug, brand_description, brand_owner } = req.body;
        const brandExists = await BrandModel.findOne({ name: brand_name });

        if (!brandExists) {
            const imageUniqueName = generateUniqueImageName(imageFile.name);

            console.log(imageUniqueName);

            const destination = "public/images/brand/" + imageUniqueName;

            imageFile.mv(
                destination,
                async (error) => {
                    if (error) {
                        res.send(messages.image_upload_unsuccessful);
                    } else {
                        await BrandModel.create(
                            {
                                name: brand_name,
                                slug: brand_slug,
                                description: brand_description,
                                owner: brand_owner,
                                image_name: imageUniqueName
                            }
                        )
                        res.send(messages.created);
                    }
                }
            )
        } else {
            res.send(messages.name_already_exists);
        }
    } catch (error) {
        console.log(error);
        res.send(messages.catch_error)
    }
}

const setStatus = async (req, res) => {
    try {
        const objKey = {};
        const id = req.params.id;
        console.log('status id', id);
        const statusType = req.body.statusType;
        console.log('statusType', statusType);

        const brandExists = await BrandModel.findById(id);

        if (brandExists) {
            if (statusType === 'status') {
                objKey.status = !brandExists.status
                res.send({
                    msg: `Brand ${statusType[0].toUpperCase() + statusType.slice(1)} Updated.`,
                    flag: 1
                })
            } else if (statusType === 'home') {
                objKey.on_home = !brandExists.on_home
                res.send({
                    msg: `Brand is Updated on ${statusType[0].toUpperCase() + statusType.slice(1)}`,
                    flag: 1
                })
            } else if (statusType === 'best') {
                objKey.is_best = !brandExists.is_best
                res.send({
                    msg: `${statusType[0].toUpperCase() + statusType.slice(1)} Brands Updated.`,
                    flag: 1
                })
            } else if (statusType === 'top') {
                objKey.is_top = !brandExists.is_top
                res.send({
                    msg: `${statusType[0].toUpperCase() + statusType.slice(1)} Brands Updated.`,
                    flag: 1
                })
            }
            await BrandModel.findByIdAndUpdate({ _id: id }, objKey)
        } else {
            res.send(messages.data_doesnot_exist);
        }

    } catch (error) {
        console.log('setStatus api', error);
        res.send(error.data.msg);
    }
}

const getBrandById = async (req, res) => {
    try {
        const id = req.params.id;
        const brand = await BrandModel.findById(id);
        res.send({
            msg: "Brand Data",
            flag: 1,
            brand,
            imageURL: "http://localhost:5000/images/brand/"
        })

    } catch (error) {
        res.send(messages.catch_error);
    }
}

const updateData = async (req, res) => {
    try {
        const id = req.params.id;
        const brand_image = req.files != null ? req.files.brand_image : null;

        console.log(req.body);

        const { brand_name, brand_slug, brand_owner, brand_description } = req.body;
        const brandExists = await BrandModel.findById(id);
        if (!brandExists) return res.send(messages.data_doesnot_exist);

        const update = {};

        if (brand_name) update.name = brand_name;
        if (brand_slug) update.slug = brand_slug;
        if (brand_owner) update.owner = brand_owner;
        if (brand_description) update.description = brand_description;
        console.log(update);

        if (brand_image) {
            const imageUniqueName = generateUniqueImageName(brand_image.name);
            const destination = "./public/images/brand/" + imageUniqueName;

            brand_image.mv(
                destination,
                async (error) => {
                    if (error) {
                        res.send(messages.image_upload_unsuccessful);
                    } else {
                        if (imageUniqueName) update.image_name = imageUniqueName;
                        await BrandModel.findByIdAndUpdate({ _id: id }, update);
                        res.send(messages.data_updated);
                        fs.unlinkSync('.public/images/brand/' + brandExists.image_name);
                    }

                }
            )
        } else {
            await BrandModel.findByIdAndUpdate(id, { $set: update })
            res.send(messages.data_updated);
        }
    } catch (error) {
        console.log(error);
        res.send(messages.catch_error);
    }
}

const deleteData = async (req, res) => {
    try {
        const id = req.params.id;
        const brandExists = await BrandModel.findOne({ _id: id });
        console.log(brandExists);
        if (!brandExists) res.send(messages.data_doesnot_exist);

        await BrandModel.findByIdAndDelete({ _id: id });
        fs.unlinkSync("./public/images/brand/" + brandExists.image_name);
        res.send(messages.data_deleted);

    } catch (error) {
        console.log('brand delete error', error);
        res.send(messages.catch_error)
    }
}


module.exports = { getData, createData, setStatus, updateData, getBrandById, deleteData };