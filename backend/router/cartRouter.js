const express = require("express");
const router = express.Router();
const auth = require('../middleware/accessControl')
const CartController = require("../controller/cartController");

router.post("/add", auth.isAuthenticated, CartController.addToCart); 
router.delete("/remove", auth.isAuthenticated, CartController.removeFromCart); 

module.exports = router;
