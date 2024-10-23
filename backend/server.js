import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import certRoutes from './routes/certificateRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import multer from 'multer';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const upload = multer();
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/certificates', upload.single('file'), certRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
