import express from 'express';
import { uploadCertificateData, getCertificate, downloadCertificate } from '../controllers/certificateController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';

const router = express.Router();

// File upload configuration using Multer
const upload = multer({ dest: 'uploads/' });

// Route for uploading certificate data (admin only)
router.post('/upload', protect, upload.single('file'), uploadCertificateData);

// Route to retrieve certificate by ID (students)
router.get('/:certificateId', getCertificate);

// Route to download certificate as PDF (students)
router.get('/:certificateId/download', downloadCertificate);

export default router;
