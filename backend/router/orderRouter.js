const express = require("express");
const router = express.Router();
const auth = require('../middleware/authen_author')


const OrderController = require("../controller/orderController");

router.get('/', OrderController.getAllOrders);

module.exports = router;
