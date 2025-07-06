import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "../models/user.model.js";

dotenv.config();

const protectRoute = async (req, res, next) => {

  try {
    const token = req.cookies.ACCESS_TOKEN;

    if (!token) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Token missing"
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode?._id || !mongoose.Types.ObjectId.isValid(decode._id)) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "Invalid token payload"
      });
    }

    const verifyUser = await User.findById(decode._id).select("-password -__v");

    if (!verifyUser) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "User not found for token"
      });
    }

    req.user = verifyUser;
    req.admin = false;
    next();
  } catch (err) {
    console.log("ACCESS TOKEN error:", err);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Server error while processing token"
    });
  }
};

export { protectRoute };
