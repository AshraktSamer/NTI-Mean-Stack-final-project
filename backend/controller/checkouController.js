const Cart = require("../model/cartModel");
const Order = require("../model/orderModel");
const Product = require("../model/productModel");

const Checkout = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res
        .status(400)
        .json({ status: "success", message: "Cart is empty" });
    }

    let totalPrice = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product || product.isInStock === false) {
        return res
          .status(400)
          .json({
            status: "success",
            message: `Product ${product?.name || "Unknown"} is out of stock`,
          });
      }
      totalPrice += product.price * item.quantity;
    }

    const order = new Order({
      userId,
      items: cart.items,
      totalPrice,
      createdAt: new Date(),
    });
    await order.save();

    cart.items = [];
    await cart.save();

    res.status(200).json({
      status: "sucecss",
      message: "Checkout successful",
      orderId: order._id,
      totalPrice,
    });
  } catch (err) {
    console.error("Error during checkout:", err);
    res
      .status(500)
      .json({ status: "failed", message: "An error occurred during checkout" });
  }
};

module.exports = Checkout;
