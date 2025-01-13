const mongoose = require("mongoose");

module.exports = (modelName) => {
  return async (req, res) => {
    try {
      const Model = mongoose.models[modelName] || mongoose.model(modelName);
      if (!Model) {
        return res
          .status(404)
          .json({ status: "failed", msg: `${modelName} not found` });
      } else {
        const Data = await Model.find();
        return res.status(200).json({ status: "success", Data });
      }
    } catch (error) {
      console.log(`Error fetching data: ${error}`);
      res.status(500).json({ status: " failed", Data: null });
    }
  };
};
