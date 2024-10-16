import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import admin from 'firebase-admin';

// Middleware for protected routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  // Check if the token exists in the request headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
