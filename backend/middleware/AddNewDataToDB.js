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
      if (modelName === "Product") {
        if (!req.file) {
          return res
            .status(400)
            .json({ status: "failed", message: "No file uploaded" });
        }
        req.body.image = req.file.filename;
      }
      const NewData = await Model.create(req.body);
      res.status(201).json({ status: " success", Data: NewData });
    } catch (error) {
      console.log(`error occured while creating new Data : ${error}`);
      res
        .status(500)
        .json({
          status: " failed",
          msg: "error occured while creating new Data",
          Data: null,
        });
    }
  };
};
