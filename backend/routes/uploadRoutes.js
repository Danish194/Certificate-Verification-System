// backend/routes/uploadRoutes.js
import express from 'express';
import { uploadStudentData } from '../controllers/uploadController.js';

const router = express.Router();

// Route to handle Excel file upload and data storage in MongoDB
router.post('/upload', uploadStudentData);

export default router;
