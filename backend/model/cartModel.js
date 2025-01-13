const mongoose = require("mongoose");
const objectID = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema({
  userId: {
    type: objectID,
    ref: "User",
    required: true,
  },
  products: [
    {
      productId: {
        type: objectID,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});


cartSchema.pre("save", async function (next) {
  const Product = mongoose.model("Product"); 
  let total = 0;

  for (let item of this.products) {
    const product = await Product.findById(item.productId).select("price"); 
    if (product) {
      total += product.price * item.quantity;
    }
  }

  this.totalAmount = total; 
  this.updatedAt = Date.now();
  next();
});
module.exports = mongoose.model("Cart", cartSchema);
