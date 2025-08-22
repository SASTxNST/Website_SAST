/* eslint-disable no-undef */
const express = require('express');

const router = express.Router();
const {
    generateEmailOtp,
    validateEmailOtp,
    generatePhoneOtp,
    validatePhoneOtp
} = require('../controllers/otpController');

// Email OTP routes
router.post('/email/generate', generateEmailOtp);
router.post('/email/validate', validateEmailOtp);

// Phone OTP routes
router.post('/phone/generate', generatePhoneOtp);
router.post('/phone/validate', validatePhoneOtp);

module.exports = router;
