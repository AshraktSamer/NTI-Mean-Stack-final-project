const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const JWT_Token = require("../utility/generateJWT");

const AllData = require("../middleware/ReadDataFromDB");

const getAllUsers = AllData("User");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      res.status(404).json({
        Status: "failed",
        data: null,
        msg: " E-mail is required",
      });
    } else if (!password) {
      res.status(404).json({
        Status: "failed",
        data: null,
        msg: " password is required",
      });
    }
    const user = await User.findOne({ email: email }).populate("role");
    if (!user) {
      res.status(404).json({
        Status: "failed",
        data: null,
        msg: " user is not found",
      });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (user && matchedPassword) {
      const token = await JWT_Token({
        email: user.email,
        id: user.id,
        userRole: user.role,
        name :user.name
      });

      return res.status(200).json({
        Status: "success",
        msg: " user logged in successfully",
        data: { email, name: user.name , userRole: user.role,  token: token  },
      });
    } else {
      return res.status(404).json({
        Status: "failed",
        data: null,
        msg: "not correct password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      Status: "failed",
      data: null,
      msg: " error occured",
    });
  }
};

const register = async (req, res, next) => {
  const { id, name, email, password, mobile, adress, role } = req.body;
  const olduser = await User.findOne({ email: email });
  //e3mely validation hena 3 ID kman
  try {
    if (olduser) {
      res.status(404).json({
        msg: "this email already exists",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newuser = new User({
        id,
        name,
        email,
        password: hashedPassword,
        mobile,
        adress,
        role,
      });

      await newuser.save();
      return res.status(201).json({
        Status: "success",
        data: { newuser },
      });
    }
  } catch (error) {
    console.log( `error occured while new user register ${error}`);
  }
};

module.exports = {
  getAllUsers,
  login,
  register,
};
