import express from 'express';
import { loginAdmin, getMe } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/me', protect, getMe);

export default router;
