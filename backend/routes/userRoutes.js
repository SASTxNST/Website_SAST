/* eslint-disable no-undef */
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  checkEmailExistsHandler,
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} = require('../controllers/userController');

// Public Routes. 
router.post("/check-email", checkEmailExistsHandler);
router.post("/register", registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Protected Routes
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);
router.delete('/account', authMiddleware, deleteUserAccount);

module.exports = router;
