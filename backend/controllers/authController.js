import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Student.js';

export const register = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, role });
        res.status(201).json({ message: 'User created', userId: user._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, role: user.role });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
