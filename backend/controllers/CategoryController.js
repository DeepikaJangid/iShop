const messages = require("../messages");
const CategoryModel = require("../models/CategoryModel");

// TRY AND CATCH -> EXCEPTION HANDLING (REQUIRES AWAIT AND ASYNC FOR ASYNC CODE)
// THEN AND CTACH -> PROMISE HANDLING

const getData = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.send({
            msg: "All the Categories",
            flag: 1,
            categories
        })
    } catch (error) {
        console.log(error);
        res.send(messages.catch_error);
    }
}

const createData = async (req, res) => {
    try {
        const { category_name, category_slug } = req.body;
        const categoryExists = await CategoryModel.findOne({ name: category_name });
        if (!categoryExists) {
            await CategoryModel.create(
                {
                    name: category_name,
                    slug: category_slug
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
        const id = (req.params.id);
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

module.exports = { getData, createData, setStatus };