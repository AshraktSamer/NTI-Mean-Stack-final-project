const WishList = require("../model/wishlistModel");

const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { productId } = req.body;

    const wishlist = await WishList.findOne({ userId });

    if (wishlist) {
      const isProductInWishlist = wishlist.products.some(
        (p) => p.productId.toString() === productId
      );

      if (!isProductInWishlist) {
        wishlist.products.push({ productId });
        await wishlist.save();
        return res.status(200).json({ message: "Product added to wishlist" });
      } else {
        return res
          .status(400)
          .json({ message: "Product is already in the wishlist" });
      }
    } else {
      await WishList.create({ userId, products: [{ productId }] });
      return res
        .status(201)
        .json({ message: "Wishlist created and product added" });
    }
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { productId } = req.body; 

    const wishlist = await WishList.findOne({ userId });

    if (wishlist) {
      const productIndex = wishlist.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (productIndex > -1) {
        wishlist.products.splice(productIndex, 1);
        await wishlist.save();

        return res
          .status(200)
          .json({ message: "Product removed from wishlist" });
      } else {
        return res
          .status(404)
          .json({ message: "Product not found in the wishlist" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Wishlist not found for the user" });
    }
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
};
