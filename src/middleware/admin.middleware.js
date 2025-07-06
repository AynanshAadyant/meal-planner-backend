function protectAdmin(req, res, next) {
  const user = req.user;

  if (!user || !user.role) {
    return res.status(401).json({
      success: false,
      status: 401,
      message: "User data not found in request. Unauthorized access."
    });
  }

  if (user.role !== 'Admin') {
    return res.status(403).json({
      success: false,
      status: 403,
      message: "Access denied. Admins only."
    });
  }

  // Proceed
  req.admin = true;
  next();
}

export { protectAdmin };