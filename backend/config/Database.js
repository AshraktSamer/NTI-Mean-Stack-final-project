require("dotenv").config();
const mongoose = require("mongoose");

const URL = process.env.MONGO_DB_URL;

const DatabaseConnection = async () => {
  try {
    await mongoose.connect(URL);
    console.log("database connected sucessfully");
  } catch (error) {
    console.log(` error occured while connecting data base :${error}`);
    process.exit(1);
  }
};

const syncAllIndexes = async () => {
  try {
    const models = Object.keys(mongoose.models); 
    for (const modelName of models) {
      const model = mongoose.models[modelName];
      console.log(`Syncing indexes for model: ${modelName}`);
      await model.syncIndexes();
    }
    console.log("All indexes synced successfully!");
  } catch (err) {
    console.error("Error syncing indexes:", err);
  }
};

const init = async () => {
  await DatabaseConnection();
  await syncAllIndexes();
};

init();

module.exports = DatabaseConnection;
