const mongoose = require('mongoose');
const ColorModel = require('./ColorModel');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            max: 40,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            max: 55,
            trim: true,
            unique: true,
        },
        description: {
            type: String,
        },
        originial_price: {
            type: Number,
            required: true,
        },
        discount_percentage: {
            type: Number,
            default: 0,
        },
        final_price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Boolean,
            default: true,
        },
        thumbnail: {
            type: String,
        },
        other_images: [
            {
                type: String,
            }
        ],
        on_home: {
            type: Boolean,
            default: false,
        },
        is_best: {
            type: Boolean,
            default: false,
        },
        is_top: {
            type: Boolean,
            default: false,
        },
        is_featured: {
            type: Boolean,
            default: false,
        },
        is_hot: {
            type: Boolean,
            default: false,
        },
        status: {
            type: Boolean,
            default: true,
        },
        category_id: {
            type: mongoose.Schema.Types.ObjectId, //jaisi kisi ki objectId hoti hai us type ka data yaha save hoga &
            ref: 'Category', //reference hai category means categories ka hi data save hoga yaha par bs (module.exports = mongoose.model('Product', ProductSchema);) yeh line mein jo bhi model ka naam hoga wahi reference ka as it is naam hoga. ya fir second option hai ki CategoryModel ko hi import krlo yaha par and use laga do. for instance -> CategoryModel (e.g. neeche color_ids mein ColorModel import kr rakha hai)
            required: true,
        },
        color_ids: {
            type: mongoose.Schema.Types.ObjectId,
            ref: ColorModel
        },
        brand_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
            required: true,
        },
        sku_id: {
            type: String,
            unique: true,
            // default: new Date().getTime() + Math.floor(Math.random() * 1000),
        }
    },
    {
        timestamps: true
    },
);

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;