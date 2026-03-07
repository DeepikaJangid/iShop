const express = require('express');
const { createOrder, getOrderById, updateOrder, deleteOrder, getAllOrders, getUserOrder, verifyPayment } = require('../controllers/OrderController');

const OrderRouter = express.Router();

// Define routes
OrderRouter.post('/', createOrder);
OrderRouter.get('/:id', getOrderById);
OrderRouter.get('/user/:userId', getUserOrder);
OrderRouter.put('/:id', updateOrder);
OrderRouter.delete('/:id', deleteOrder);
OrderRouter.get('/', getAllOrders);
OrderRouter.post('/verify-payment', verifyPayment);

module.exports = OrderRouter;