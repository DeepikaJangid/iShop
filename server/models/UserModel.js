const mongoose = require('mongoose');


const ShippingAddressSchema = new mongoose.Schema(
    {
        addressLine1: { type: String, required: true, trim: true },
        addressLine2: { type: String, required: false, trim: true },
        city: { type: String, required: true, trim: true },
        contact: { type: String, default: null },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        countryCode: { type: String, required: true },
    },
    { _id: false, } //yeh schema ki id nahi chahiye isliye _id false
); //bade schema banate hai to aise chote chote parts mein deivide karna thik rehta isliye alag se shipping address ka banaya hai

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 20,
            required: true,
            trim: true,
            minlength: 3,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        shipping_address: {
            type: [ShippingAddressSchema],
            default: [],
        }
    },
    {
        timestamps: true
    },
);


const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;