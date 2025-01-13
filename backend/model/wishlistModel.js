const mongoose = require("mongoose");
const objectID = mongoose.Schema.Types.ObjectId;

const wishlistSchema = new mongoose.Schema({
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
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  name: {
    type: String,
    default: "My Wishlist",
  },
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
