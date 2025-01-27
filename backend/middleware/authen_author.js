const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const authenticateUser = async (req ) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new Error("Authentication required");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).populate("role");
//   console.log(user)

  if (!user) {
    throw new Error("User not found");
  }
    return user;
 };

const isAuthenticated = async (req, res, next) => {
  try {
    const user = await authenticateUser(req);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await authenticateUser(req);

    if (user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.user = user;
    // console.log(`amin : ${user}`)
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: error.message });
  }
};


module.exports = {
  isAdmin,
  isAuthenticated,
};
