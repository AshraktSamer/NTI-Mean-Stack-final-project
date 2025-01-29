const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // id: {
  //   type: Number,
  //   required: true,
  //   unique: true,
  // },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    match: /^[0-9]{11}$/,
  },
  adress: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
    enum: ["User", "Admin"],
    default: "User",
  },
});

module.exports = mongoose.model("User", userSchema);
