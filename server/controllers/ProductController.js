const messages = require('../messages');
const ProductModel = require('../models/ProductModel');
const { generateUniqueImageName } = require('../helper/helper');
const fs = require('fs'); //fs = fileststem (for deletion of image cause delete won't delete the image instead will only delete the data not the image)

// TRY AND CATCH -> EXCEPTION HANDLING (REQUIRES AWAIT AND ASYNC FOR ASYNC CODE)
// THEN AND CTACH -> PROMISE HANDLING

const getData = async (req, res) => {
    try {
        const products = await ProductModel.find().populate([
            {
                path: "category_id",
                select: "name"
            },
            {
                path: "color_ids",
                select: "name code"
            },
            {
                path: "brand_id",
                select: "name"
            }
        ]);
        //populate - meaning jo bhi data is product ke module se linked hai unko ek jagah par leke aana
        res.send({
            msg: "All the Products",
            flag: 1,
            products,
            imageURL: "http://localhost:5000/images/product/"
        })
    } catch (error) {
        res.send(error.data.msg)
    }
}

const getDataById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findById({ _id: id }).populate([
            {
                path: "category_id",
                select: "name"
            },
            {
                path: "color_ids",
                select: "name code"
            },
            {
                path: "brand_id",
                select: "name"
            }
        ]);
        res.send({
            msg: "Product Data",
            flag: 1,
            product,
            imageURL: "http://localhost:5000/images/product/"
        })
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const createData = async (req, res) => {
    try {
        // console.log(req.files.image);
        // without npm i express-fileupload middleware you will only undefined instead of data. the solution is imported in product-route.js cuz the package will only be used for create api. FileUpload is used in the middle of "/create" path and createData function.

        const imageFile = req.files.thumbnail; //image name input type=file mein image lene wala jo input hai uska naam image hai isliye image name use hua hai yaha par

        // return
        const { product_name, product_slug, descirption, original_price, discount_percent, final_price, category_id, color_ids, brand_id } = req.body; //file (image) req.body mein nahi aati instead, req.files mein aati hai
        const productExists = await ProductModel.findOne({ slug: product_slug });
        if (!productExists) {

            const imageUniqueName = generateUniqueImageName(imageFile.name); //function for generating unique name that will concatinate with the image name so that when user uploads two different files with the same name the second file doesnot replace the first fie.
            const destination = "./public/images/product/main_images/" + imageUniqueName;
            //                  ./public isliye kyunki jo code neeche execute ho rha hai woh app.js se ho rha hai

            imageFile.mv(
                destination, //destination (path of where to save the image)
                async (error) => { //cb
                    if (error) {
                        return res.send(messages.image_upload_unsuccessful);
                    } else {
                        await ProductModel.create(
                            {
                                name: product_name,
                                slug: product_slug,
                                description: descirption,
                                original_price: original_price,
                                discount_percentage: discount_percent,
                                final_price: final_price,
                                thumbnail: imageUniqueName,
                                category_id: category_id,
                                color_ids: JSON.parse(color_ids),
                                brand_id: brand_id
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
        res.send(messages.catch_error);
    }
}

const uploadOtherImages = async (req, res) => {
    try {
        const { product_id } = req.body;
        const imageFiles = req.files.other_images;
        const product = await ProductModel.findById(product_id);

        if (!product) {
            return res.send({
                msg: "Product Not Found.",
                flag: 0
            })
        }
        const other_images_names = product.other_images;
        if (Array.isArray(imageFiles) == true) {
            const all_promises = imageFiles.map(
                async (img) => {
                    const image_name = generateUniqueImageName(img.name);
                    console.log(image_name);
                    const destination = "./public/images/product/other_images/" + image_name;
                    other_images_names.push(image_name);
                    await img.mv(destination);
                }
            )
            await Promise.all(all_promises); //loop mein promises ban rahe hia isliye Promise.all use kiya hai... images koi pehle upload ho koi baad mein ho.. asynchrnous hai isliye pehle wait karo sab images upload hone ka uske baad hi next code run hoga, uske liye "Promise.ALl" use kiya hai.
        } else {
            const image_name = generateUniqueImageName(imageFiles.name);
            const destination = "./public/images/product/other_images/" + image_name;
            other_images_names.push(image_name);
            await imageFiles.mv(destination);
        }
        product.other_images = other_images_names; //update operation perform hua hai yaha
        await product.save();
        res.send({
            msg: "Image Updated!",
            flag: 1,
            updated_other_images: other_images_names //updated isliye kyunki frontend par bhi show karna hai ki yeh images upload hui hai
        })
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
        const productExists = await ProductModel.findById(id)
        if (productExists) {

            console.log(productExists);

            if (statusType === "status") {
                objKey.status = !productExists.status //objkey ke sath mein status,on_home is liye kyunki mongoose {name: value} aise data expect karta hai and productExists.status either true or false value dega to ( await ProductModel.findByIdAndUpdate()) ismein mongoose ko samjh aaye ki status hai ya on_home hai to saath mein name pass kiya hai.   
                res.send({
                    msg: `Product ${statusType[0].toUpperCase() + statusType.slice(1)} Updated.`,
                    flag: 1
                })
            } else if (statusType === "home") {
                objKey.on_home = !productExists.on_home
                res.send({
                    msg: `Product is Updated on ${statusType[0].toUpperCase() + statusType.slice(1)}`,
                    flag: 1
                })
            } else if (statusType === "top") {
                objKey.is_top = !productExists.is_top
                res.send({
                    msg: `${statusType[0].toUpperCase() + statusType.slice(1)} Products Updated.`,
                    flag: 1
                })
            } else if (statusType === "best") {
                if (productExists.is_best === false) {
                    objKey.is_hot = true;
                }
                if (productExists.is_best === false && productExists.is_featured === true) { //if best-seller is true and user want to true featured then, it will return from here and also return the error
                    res.status(400).send(
                        {
                            msg: "Product Cannot be Both Bestseller and Featured.",
                            flag: 0
                        }
                    )
                    return;
                }
                objKey.is_best = !productExists.is_best
                res.send({
                    msg: `${statusType[0].toUpperCase() + statusType.slice(1)} Products Updated.`,
                    flag: 1
                })
            } else if (statusType === "featured") {
                if (productExists.is_best === true && productExists.is_featured === false) { //if best-seller is true and user want to true featured then, it will return from here and also return the error
                    res.status(400).send(
                        {
                            msg: "Product Cannot be Both Bestseller and Featured.",
                            flag: 0
                        }
                    )
                    return;
                }
                objKey.is_featured = !productExists.is_featured
                res.send({
                    msg: `${statusType[0].toUpperCase() + statusType.slice(1)} Products Updated.`,
                    flag: 1
                })
            } else if (statusType === "hot") {
                objKey.is_hot = !productExists.is_hot
                res.send({
                    msg: `${statusType[0].toUpperCase() + statusType.slice(1)} Products Updated.`,
                    flag: 1
                })
            } else if (statusType === "stock") {
                objKey.stock = !productExists.stock
                res.send({
                    msg: `${statusType[0].toUpperCase() + statusType.slice(1)}s Updated.`,
                    flag: 1
                })
            }

            await ProductModel.findByIdAndUpdate(
                { _id: id },
                objKey //id se find karke.. objkey ke andar jo bhi status req hai uska data aa jayega.
                // { status: !productExists.status } //productExists.status will get the status of the selected id and if its true.. will make it false and vice versa.
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
        const productExists = await ProductModel.findOne({ _id: id });
        if (!productExists) {
            res.send(messages.data_doesnot_exist);
        }

        await ProductModel.findByIdAndDelete({ _id: id })
        fs.unlinkSync("./public/images/product/" + "main_images/" + productExists.thumbnail);
        res.send(messages.data_deleted)
    } catch (error) {
        console.log(error);
        res.send(messages.catch_error);
    }
}

const updateData = async (req, res) => {
    try {
        const id = req.params.id;
        const product_image = req.files != null ? req.files.thumbnail : null;
        const { product_name, product_slug, description, original_price, discount_percent, final_price, category_id, color_ids, brand_id } = req.body;

        const productExists = await ProductModel.findById(id);
        if (!productExists) return res.send(messages.data_doesnot_exist);
        const update = {};
        if (product_name) update.name = product_name;
        if (product_slug) update.slug = product_slug;
        if (description) update.description = description;
        if (original_price) update.original_price = original_price;
        if (discount_percent) update.discount_percentage = discount_percent;
        if (final_price) update.final_price = final_price;
        if (category_id) update.category_id = category_id;
        if (color_ids) update.color_ids = JSON.parse(color_ids);
        if (brand_id) update.brand_id = brand_id;

        // console.log(update); output -> {product_name: '1', product_slu: '1'}


        if (product_image) {
            const imageUniqueName = generateUniqueImageName(product_image.name); //function for generating unique name that will concatinate with the image name so that when user uploads two different files with the same name the second file doesnot replace the first fie.
            const destination = "./public/images/product/main_images/" + imageUniqueName;
            //                  ./public isliye kyunki jo code neeche execute ho rha hai woh app.js se ho rha hai
            product_image.mv(
                destination,
                // error aata hi aata hai move ke time fix hai. document mein likha hai.
                async (error) => {
                    if (error) {
                        return res.send(messages.image_upload_unsuccessful)
                    } else {
                        if (imageUniqueName) update.thumbnail = imageUniqueName;
                        await ProductModel.findByIdAndUpdate(id, { $set: update })
                        res.send(messages.data_updated);
                        fs.unlinkSync("./public/images/product/main_images/" + productExists.thumbnail);
                    }
                }
            )
        } else {
            // console.log(update);
            // const updatedproduct = await ProductModel.findByIdAndUpdate(id, { $set: update }, { new: true });
            // console.log(updatedproduct);
            await ProductModel.findByIdAndUpdate(id, { $set: update })
            res.send(messages.data_updated);
        }

    } catch (error) {
        res.send(messages.catch_error);
    }
}

module.exports = { getData, createData, setStatus, deleteData, getDataById, updateData, uploadOtherImages };