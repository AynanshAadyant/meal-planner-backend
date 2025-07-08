function protectAdmin(req, res, next) {
  try{
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
    next();
  }
  catch( err ) {
    console.log( "ERROR in admin middleware ", err );
    return res.status( 500 ).json( {
      success: false,
      status: 500,
      message: `Something went wrong\n${err}`
    })
  }
}

export { protectAdmin };