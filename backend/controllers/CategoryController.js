const messages = require("../messages");
const CategoryModel = require("../models/CategoryModel");
const { generateUniqueImageName } = require('../helper/helper');
const fs = require('fs'); //fs = fileststem (for deletion of image cause delete won't delete the image instead will only delete the data not the image)


// TRY AND CATCH -> EXCEPTION HANDLING (REQUIRES AWAIT AND ASYNC FOR ASYNC CODE)
// THEN AND CTACH -> PROMISE HANDLING

const getData = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.send({
            msg: "All the Categories",
            flag: 1,
            categories,
            imageURL: "http://localhost:5000/images/category/"
        })
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const getDataById = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await CategoryModel.findById({ _id: id });
        res.send({
            msg: "Category Data",
            flag: 1,
            category,
            imageURL: "http://localhost:5000/images/category/"
        })
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const createData = async (req, res) => {
    try {
        // console.log(req.files.image);
        // without npm i express-fileupload middleware you will only undefined instead of data. the solution is imported in category-route.js cuz the package will only be used for create api. FileUpload is used in the middle of "/create" path and createData function.

        const imageFile = req.files.category_image; //image name input type=file mein image lene wala jo input hai uska naam image hai isliye image name use hua hai yaha par

        // return
        const { category_name, category_slug } = req.body; //file (image) req.body mein nahi aati instead, req.files mein aati hai
        const categoryExists = await CategoryModel.findOne({ name: category_name });
        if (!categoryExists) {

            const imageUniqueName = generateUniqueImageName(imageFile.name); //function for generating unique name that will concatinate with the image name so that when user uploads two different files with the same name the second file doesnot replace the first fie.
            const destination = "./public/images/category/" + imageUniqueName;
            //                  ./public isliye kyunki jo code neeche execute ho rha hai woh app.js se ho rha hai

            imageFile.mv(
                destination, //destination (path of where to save the image)
                async (error) => { //cb
                    if (error) {
                        return res.send(messages.image_upload_unsuccessful);
                    } else {
                        await CategoryModel.create(
                            {
                                name: category_name,
                                slug: category_slug,
                                image_name: imageUniqueName
                            }
                        )
                    }
                }
            )
            res.send(messages.created);
        } else {
            res.send(messages.name_already_exists);
        }
    } catch (error) {
        console.log(error);
        res.send(messages.catch_error);
    }
}

const setStatus = async (req, res) => {
    try {
        const objKey = {}; //blank object key
        const statusType = req.body.statusType;
        const id = req.params.id;
        const categoryExists = await CategoryModel.findById(id)
        if (categoryExists) {

            if (statusType === "status") {
                objKey.status = !categoryExists.status //objkey ke sath mein status,on_home is liye kyunki mongoose {name: value} aise data expect karta hai and categoryExists.status either true or false value dega to ( await CategoryModel.findByIdAndUpdate()) ismein mongoose ko samjh aaye ki status hai ya on_home hai to saath mein name pass kiya hai.   
                res.send({
                    msg: `Category ${statusType[0].toUpperCase() + statusType.slice(1)} Updated.`,
                    flag: 1
                })
            } else if (statusType === "home") {
                objKey.on_home = !categoryExists.on_home
                res.send({
                    msg: `Category is Updated on ${statusType[0].toUpperCase() + statusType.slice(1)}`,
                    flag: 1
                })
            } else if (statusType === "top") {
                objKey.is_top = !categoryExists.is_top
                res.send({
                    msg: `${statusType[0].toUpperCase() + statusType.slice(1)} Categories Updated.`,
                    flag: 1
                })
            } else if (statusType === "best") {
                objKey.is_best = !categoryExists.is_best
                res.send({
                    msg: `${statusType[0].toUpperCase() + statusType.slice(1)} Categories Updated.`,
                    flag: 1
                })
            }

            await CategoryModel.findByIdAndUpdate(
                { _id: id },
                objKey //id se find karke.. objkey ke andar jo bhi status req hai uska data aa jayega.
                // { status: !categoryExists.status } //categoryExists.status will get the status of the selected id and if its true.. will make it false and vice versa.
            )

        } else {
            res.send(messages.data_doesnot_exist);
        }

    } catch (error) {
        res.send(messages.catch_error);
    }
}

const deleteData = async (req, res) => {
    try {
        const id = req.params.id;
        const categoryExists = await CategoryModel.findOne({ _id: id });
        if (!categoryExists) {
            res.send(messages.data_doesnot_exist);
        }

        await CategoryModel.findByIdAndDelete({ _id: id })
        fs.unlinkSync("./public/images/category/" + categoryExists.image_name);
        res.send(messages.data_deleted)
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const updateData = async (req, res) => {
    try {
        const id = req.params.id;
        const category_image = req.files != null ? req.files.category_image : null;
        const { category_name, category_slug } = req.body;
        const categoryExists = await CategoryModel.findById(id);
        if (!categoryExists) return res.send(messages.data_doesnot_exist);
        const update = {};
        if (category_name) update.name = category_name;
        if (category_slug) update.slug = category_slug;
        // console.log(update); output -> {category_name: '1', category_slu: '1'}


        if (category_image) {
            const imageUniqueName = generateUniqueImageName(category_image.name); //function for generating unique name that will concatinate with the image name so that when user uploads two different files with the same name the second file doesnot replace the first fie.
            const destination = "./public/images/category/" + imageUniqueName;
            //                  ./public isliye kyunki jo code neeche execute ho rha hai woh app.js se ho rha hai
            category_image.mv(
                destination,
                // error aata hi aata hai move ke time fix hai. document mein likha hai
                async (error) => {
                    if (error) {
                        return res.send(messages.image_upload_unsuccessful)
                    } else {
                        if (imageUniqueName) update.image_name = imageUniqueName;
                        await CategoryModel.findByIdAndUpdate(id, { $set: update })
                        res.send(messages.data_updated);
                        fs.unlinkSync("./public/images/category/" + categoryExists.image_name);

                    }
                }
            )
        } else {
            console.log(update);
            // const updatedCategory = await CategoryModel.findByIdAndUpdate(id, { $set: update }, { new: true });
            // console.log(updatedCategory);
            await CategoryModel.findByIdAndUpdate(id, { $set: update })
            res.send(messages.data_updated);
        }

    } catch (error) {
        console.log(error);
        res.send(messages.catch_error);
    }
}

module.exports = { getData, createData, setStatus, deleteData, getDataById, updateData };