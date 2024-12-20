import express from 'express';
import upload from '../utils/multer.js';
import uploadToCloudinary from '../utils/cloudinaryConfig.js';
import fs from 'fs/promises'

const router = express.Router();

router.post('/', upload.single('file'), async (req, res) => {
    console.log('here')
    try {
       if (!req.file) {
        return res.status(400).send('No file uploaded.');
        }
      const cloudinaryResponse = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path);
      res.json({
        message: 'File uploaded successfully',
        imgUrl: cloudinaryResponse.secure_url,
      });
    } catch (error) {
      res.status(500).send('Error uploading file.');
      if (req.file && req.file.path) {
        try {
          await fs.unlink(req.file.path);
        } catch (cleanupError) {
          console.error('Error cleaning up file:', cleanupError);
        }
      }
    }
  });

export default router;