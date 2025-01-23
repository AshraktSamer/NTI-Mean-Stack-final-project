const mongoose = require("mongoose");
const objectID = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
  customerId: {
    type: objectID,
    ref: "User", 
    required: true,
  },
  products: [
    {
      productId: {
        type:objectID,
        ref: "Product", 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      priceAtPurchase: {
        type: Number, 
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "PayPal", "Cash on Delivery"],
    required: true,
  },
});

module.exports =  mongoose.model("Order", orderSchema);

