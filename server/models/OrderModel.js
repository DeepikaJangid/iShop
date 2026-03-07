const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, //kisne order place kiya
        product_details: [
            {
                name: { type: String, required: true },
                id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
                qty: { type: Number, required: true, min: 1 },
                final_price: { type: Number, required: true },
                original_price: { type: Number, required: true },
                imgUrl: { type: String, required: true },
            },
        ],
        totalAmount: { type: Number, required: true },
        shippingAddress: {
            addressLine1: { type: String, required: true, trim: true }, // Required field
            addressLine2: { type: String, required: true, trim: true }, // Optional field
            city: { type: String, required: true, trim: true },
            contact: { type: String, default: null },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
            name: { type: String, required: true },
        }, // 0: Cash on Delivery, 1: Online Payment
        paymentMode: { type: Number, enum: [0, 1], required: true },
        paymentStatus: { type: Number, enum: [0, 1], default: 0 },
        // 0: Pending, 1: Completed
        orderStatus: { type: Number, enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], default: 0 },
        // 0: Pending, 1: Confirmed, 2: Shipped, 3: Out for Delivery, 4: Delivered, 5: Cancelled, 6: Returned, 7: Refund Initiated, 8: Refunded, 9: Failed
        orderStatusHistory: [
            {
                status: { type: Number, enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], required: true },
                updatedAt: { type: Date, default: Date.now }, //konsi date ko order ka kya status hai
            },
        ],
        is_free_shipping: { type: Boolean, default: true },
        razor_pay_order_id: { type: String, default: null },
    },
    { timestamps: true },
);

const OrderModel = mongoose.model("Order", OrderSchema);
module.exports = OrderModel;