const express = require("express");
const router = express.Router();

const CartController = require("../controller/cartController");
const authenticate = require("../middleware/isAuthenticated");

router.post("/add", authenticate, CartController.addToCart); 
router.delete("/remove", authenticate, CartController.removeFromCart); 

module.exports = router;
