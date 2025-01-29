const Cart = require("../model/cartModel");
const Product = require("../model/productModel"); // Assuming this exists

const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the token
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save(); // Middleware will calculate totalAmount
      return res.status(200).json({ Msg: "Product added to cart", cart });
    } else {
      const cartData = {
        userId,
        products: [{ productId, quantity }],
      };

      const newCart = new Cart(cartData);
      await newCart.save(); // Middleware will calculate totalAmount
      return res
        .status(201)
        .json({ Msg: "Cart created and product added", newCart });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ Msg: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from the token
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.products.splice(productIndex, 1); // Remove product from the cart
        await cart.save(); // Middleware will recalculate totalAmount
        return res
          .status(200)
          .json({ message: "Product removed from cart", cart });
      } else {
        return res.status(404).json({ message: "Product not found in cart" });
      }
    } else {
      return res.status(404).json({ message: "Cart not found for user" });
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
};
