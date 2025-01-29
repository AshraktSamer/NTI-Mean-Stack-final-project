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
        const ID = req.params.Id;
        // console.log(ID)

        if (!ID) {
          return res
            .status(400)
            .json({ status: "failed", msg: "ID parameter is required" });
        }
        const deletedData = await Model.findOneAndDelete({ _id :ID });

        if (!deletedData) {
          return res
            .status(404)
            .json({
              status: "failed",
              msg: `No ${modelName} found with the specified ID`,
            });
        }
        return res.status(200).json({ status: "success", deletedData });
      }
    } catch (error) {
      console.log(`Error deleting data: ${error}`);
      res.status(500).json({ status: " failed", Data: null });
    }
  };
};
