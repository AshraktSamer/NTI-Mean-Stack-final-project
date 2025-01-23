const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "Admin") {
      next(); 
    } else {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = isAdmin;
