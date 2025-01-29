const mongoose = require("mongoose");

module.exports = (modelName) => {
  return async (req, res) => {
    try {
      const Model = mongoose.models[modelName] || mongoose.model(modelName);
      if (!Model) {
        return res
          .status(404)
          .json({ status: "failed", msg: `${modelName} not found` });
      }
      const ID = req.params.Id;
      if (modelName === "Product" && req.file) {
        req.body.image = req.file.filename;
      }
      const updatedData = await Model.findOneAndUpdate(
        { _id: ID },
        { $set: { ...req.body } },
        { new: true }
      );
      if (!updatedData) {
        res.status(404), json({ status: " falied", msg: " id not found" });
      } else {
        res.status(201).json({ status: "success", data: updatedData });
      }
    } catch (error) {
      console.log(`Error updating data: ${error}`);
      res.status(500).json({ status: " failed", Data: null });
    }
  };
};
