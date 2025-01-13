const mongoose = require("mongoose");
const objectID = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: objectID,
    ref: "Category",
    required: true,
  },
  subCategory: {
    type: objectID,
    ref: "SubCategory",
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isInStock: {
    type: Boolean,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
  },
  isBestSeller: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
