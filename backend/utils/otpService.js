const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Temporary in-memory store for OTPs (replace with DB/Redis in production)
const otpStore = {};

// Generate a 6-digit OTP
exports.generateOtp = async (key) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[key] = { otp, expires: Date.now() + 1 * 60 * 1000 }; // OTP expires in 1 minute`
    return otp;
};

// Validate OTP
exports.validateOtp = async (key, otp) => {
    const record = otpStore[key];
    if (!record) return false;
    if (Date.now() > record.expires) {
        delete otpStore[key];
        return false;
    }
    const valid = record.otp === otp;
    if (valid) delete otpStore[key];
    return valid;
};

// Email transporter using nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.OTP_EMAIL_USER,
        pass: process.env.OTP_EMAIL_PASS,
    }
});

// Send OTP via email
exports.sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.OTP_EMAIL_USER,
        to: email,
        subject: 'SAST Secure Access Code',
        text: `Greetings from SAST Mission Control,

Your One-Time Passcode (OTP) for secure access is: ${otp}

Please enter this code within 1 minute to complete your authentication.

If you did not request this code, please ignore this message.

— SAST Security Team
Exploring beyond limits, securing every step.`
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP ${otp} sent to email ${email}`);
};


// Send OTP via phone (stub)
exports.sendOtpPhone = async (phone, otp) => {
    console.log(`Sending OTP ${otp} to phone ${phone}`);
    // integrate actual SMS service here
};
