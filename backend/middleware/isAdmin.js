const isAdmin = (req, res, next) => {
  try {
    // Assuming `req.user` contains the logged-in user's data
    if (req.user && req.user.role === "Admin") {
      next(); // Allow the request to proceed
    } else {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = isAdmin;
