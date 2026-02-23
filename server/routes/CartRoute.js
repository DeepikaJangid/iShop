const express = require('express');
const { syncCart, updateQuantity, removeCartItem, addCartItem, emptyCart } = require('../controllers/CartController');

const CartRouter = express.Router();

CartRouter.post(
    '/sync-cart',
    syncCart
);

CartRouter.post(
    '/update-quantity',
    updateQuantity
)

CartRouter.post(
    '/remove-item',
    removeCartItem
)

CartRouter.post(
    '/add-item',
    addCartItem
)

CartRouter.delete(
    '/empty/:user_id',
    emptyCart
)

module.exports = CartRouter;