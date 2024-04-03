const express = require('express');

const ordersController = require('../controllers/orders.controller');

const router = express.Router();


router.post('/', ordersController.addOrder); // /orders/items;

router.get('/', ordersController.getOrders);



module.exports = router;