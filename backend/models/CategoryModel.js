const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 50,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
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
        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true
    }
)

const CategoryModel = mongoose.model("Category", CategorySchema);
//                         name of mongoose model, schema

module.exports = CategoryModel;