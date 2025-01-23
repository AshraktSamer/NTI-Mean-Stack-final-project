  const mongoose = require("mongoose");
  const objectID = mongoose.Schema.Types.ObjectId;

  const subcategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      },
    categoryId: {
      type: objectID,
      ref: "Category",
      required: true,
    },

  });

  module.exports = mongoose.model("SubCategory", subcategorySchema);



