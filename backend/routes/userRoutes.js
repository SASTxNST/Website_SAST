const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} = require('../controllers/userController');

// OTP Related imports
// const {
//     generateOtp,
//     sendOtpEmail,
//     validateEmail,
//     sentOtpPhone,
//     validatePhone
// } = require('../utils/otpService')

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected Routes
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.delete('/account', authMiddleware, deleteUserAccount);

module.exports = router;