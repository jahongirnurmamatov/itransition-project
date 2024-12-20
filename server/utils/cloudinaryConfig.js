import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

  const uploadToCloudinary = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'uploads', 
      });
      return result;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };
export default uploadToCloudinary;