const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 15,
            required: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
)

const ColorModel = mongoose.model("Color", ColorSchema);

module.exports = ColorModel;