// authMiddleware.js
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user information to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
