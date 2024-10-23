import express from 'express';
import multer from 'multer';
import { uploadCertificates, getCertificate } from '../controllers/certificateController.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; // Ensure the auth middleware path is correct

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder where uploaded files will be saved
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Create unique filenames
  }
});
const upload = multer({ storage: storage });

// Route to handle certificate upload
router.post('/upload', upload.single('file'), authMiddleware, uploadCertificates);

// Route to fetch a certificate by ID
router.get('/:id', authMiddleware, getCertificate);

export default router;
