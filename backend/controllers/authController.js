import asyncHandler from 'express-async-handler';
import admin from 'firebase-admin';

// @desc Authenticate admin user
// @route POST /api/auth/login
// @access Public
export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await admin.auth().getUserByEmail(email);

    if (!user) {
      res.status(400);
      throw new Error('Invalid credentials');
    }

    const token = await admin.auth().createCustomToken(user.uid);
    res.json({ token });
  } catch (error) {
    res.status(401);
    throw new Error('Authentication failed');
  }
});

// @desc Get current user
// @route GET /api/auth/me
// @access Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await admin.auth().getUser(req.user.uid);
  res.json({
    uid: user.uid,
    email: user.email,
  });
});
