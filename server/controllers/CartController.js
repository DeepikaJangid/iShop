const CartModel = require('../models/CartModel');
const messages = require('../messages');

const syncCart = async (req, res) => {
    try {
        const { user_id, cart_data } = req.body; //cart_data is an array of objects.
        for (let cd of cart_data) {
            const cartItems = await CartModel.findOne({ product_id: cd.id, user_id: user_id }) //in simple words localstorage and db dono check krke sync kr rhe hai...agar already data hai then increase the quantity and sync both the carts if data is not in the db then create the new data and then save into db
            //jiski product_id localstorage mein jo data hai us product id se match karti hai (id yaha par cartReducer se aayi hai) and jo db mein user_id hai us se abhi jo login kar raha hai us user ki user_id se match krti hai uska data nikalo
            if (cartItems) { //agar match karti hai mtlab cart mein item pehle se hai and ab uski quantity increase karni hai 
                cartItems.quantity = cartItems.quantity + cd.qty;
                await cartItems.save(); //update the quantity
            } else {
                await CartModel({ user_id: user_id, product_id: cd.id, quantity: cd.qty }).save();
            }
        }
        const finalCart = await CartModel.find({ user_id: user_id }).populate({
            path: "product_id", //jo cartModel mein hai same name
            select: 'name final_price original_price thumbnail'
        })
        res.send({
            finalCart,
            msg: '',
            flag: 1
        })
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const updateQuantity = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;
        if (quantity <= 0) {
            await CartModel.deleteOne({ user_id, product_id });
        } else {
            await CartModel.updateOne(
                { user_id, product_id },
                { $set: { quantity } }
            );
        }
        const finalCart = await CartModel.find({ user_id }).populate({
            path: "product_id",
            select: 'name final_price original_price thumbnail'
        });
        res.send({
            finalCart,
            flag: 1
        });
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const addCartItem = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;
        const cartItem = await CartModel.findOne({ user_id, product_id });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            await CartModel({ user_id, product_id, quantity }).save();
        }

        const finalCart = await CartModel.find({ user_id }).populate({
            path: "product_id",
            select: "name final_price original_price thumbnail",
        });

        res.send({ finalCart, flag: 1 });
    } catch (err) {
        res.send(messages.catch_error);
    }
}

const removeCartItem = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;
        await CartModel.deleteOne({ user_id, product_id });
        const finalCart = await CartModel.find({ user_id }).populate({
            path: "product_id",
            select: 'name final_price original_price thumbnail'
        });
        res.send({ finalCart, flag: 1 });
    } catch (error) {
        res.send(messages.catch_error);
    }
}

const emptyCart = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        if (!user_id) {
            return res.send(
                {
                    flag: 0,
                    msg: 'User ID is required.'
                }
            );
        }
        await CartModel.deleteMany({ user_id });
        res.send(
            {
                flag: 1,
                msg: 'Cart Emptied Successfully',
                finalCart: []
            }
        );
    } catch (error) {
        res.send(messages.catch_error);
    }
}

module.exports = { syncCart, updateQuantity, removeCartItem, addCartItem, emptyCart };