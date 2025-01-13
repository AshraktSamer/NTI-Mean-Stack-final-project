const express = require("express");
const router = express.Router();

const WishListContoller= require("../controller/wishlistController");
const authenticate = require("../middleware/isAuthenticated");

router.post("/", authenticate, WishListContoller.addToWishlist);
router.delete("/", authenticate, WishListContoller.removeFromWishlist);

module.exports = router;