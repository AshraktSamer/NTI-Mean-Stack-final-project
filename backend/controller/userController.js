const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const JWT_Token = require("../utility/generateJWT");

const AllData = require("../middleware/ReadDataFromDB");

const getAllUsers = AllData("User");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
     return res.status(404).json({
        Status: "failed",
        Data: null,
        Msg: " E-mail is required",
      });
    } else if (!password) {
      return res.status(404).json({
        Status: "failed",
        Data: null,
        Msg: " password is required",
      });
    }
    const user = await User.findOne({ email: email }).populate("role");
    if (!user) {
    return  res.status(404).json({
        Status: "failed",
        Data: null,
        Msg: " user is not found",
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
        Msg: " user logged in successfully",
        Data: { email, name: user.name },
        Token: token ,
        Role : user.role,

      });
    } else {
      return res.status(404).json({
        Status: "failed",
        Data: null,
        Msg: "not correct password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      Status: "failed",
      Data: null,
      Msg: " error occured",
    });
  }
};

const register = async (req, res, next) => {
  const { name, email, password, mobile, adress, role } = req.body;
  const olduser = await User.findOne({ email: email });
  //e3mely validation hena 3 ID kman
  try {
    if (olduser) {
      res.status(404).json({
        Msg: "this email already exists",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newuser = new User({
        name,
        email,
        password: hashedPassword,
        mobile,
        adress,
        role: role || "User", 
      });

      await newuser.save();
      return res.status(201).json({
        Status: "success",
        Data: newuser,
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
