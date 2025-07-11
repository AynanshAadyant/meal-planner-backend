import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";

dotenv.config( {} );

cloudinary.config( {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadToCloudinary = async (localFilePath) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath);
    return result; // Contains: secure_url, public_id, etc.
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    throw err;
  }
};

export default uploadToCloudinary;
