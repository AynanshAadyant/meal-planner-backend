import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config( {} );

const generateAccessToken = async (data) => {
  try {
    const token = jwt.sign(
      { ...data },
      process.env.JWT_SECRET, // Secret key from .env
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d', // Token expires in 1 hour
      }
    );
    return token;
  } catch (err) {
    console.error("Error generating token:", err);
    throw err;
  }
};

export { generateAccessToken };
