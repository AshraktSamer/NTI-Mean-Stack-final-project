const express = require("express");
const router = express.Router();

const OrderController = require("../controller/orderController");

router.get('/', OrderController.getAllOrders);

module.exports = router;
