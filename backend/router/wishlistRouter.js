const express = require("express");
const router = express.Router();
const auth = require('../middleware/accessControl')


const WishListContoller= require("../controller/wishlistController");

router.post("/", auth.isAuthenticated, WishListContoller.addToWishlist);
router.delete("/", auth.isAuthenticated, WishListContoller.removeFromWishlist);

module.exports = router;