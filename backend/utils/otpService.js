/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Temporary in-memory store for OTPs (replace with DB/Redis in production)
const otpStore = {};

// Generate a 6-digit OTP
exports.generateOtp = async (key) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[key] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // OTP expires in 5 minutes
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

// Automatic cleanup of expired OTPs every 1 minute
setInterval(() => {
    const now = Date.now();
    Object.keys(otpStore).forEach(key => {
        if (otpStore[key].expires < now) delete otpStore[key];
    });
}, 60 * 1000);

// Email transporter using Gmail via TLS/587
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use TLS
    auth: {
        user: process.env.OTP_EMAIL_USER,
        pass: process.env.OTP_EMAIL_PASS // Gmail App Password
    },
    logger: true,
    debug: true
});

// Send OTP via email
exports.sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.OTP_EMAIL_USER,
        to: email,
        subject: 'SAST Secure Access Code',
        text: `Greetings from SAST Mission Control,

Your One-Time Passcode (OTP) for secure access is: ${otp}

Please enter this code within 5 minutes to complete your authentication.

If you did not request this code, please ignore this message.

— SAST Security Team
Exploring beyond limits, securing every step.`,
        html: `
            <p>Greetings from <b>SAST Mission Control</b>,</p>
            <p>Your One-Time Passcode (OTP) for secure access is: <b>${otp}</b></p>
            <p>Please enter this code within <b>5 minutes</b> to complete your authentication.</p>
            <p>If you did not request this code, please ignore this message.</p>
            <hr>
            <p>— SAST Security Team<br/>Exploring beyond limits, securing every step.</p>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`OTP ${otp} sent to email ${email}`);
        console.log('Email info:', info);
        return true;
    } catch (error) {
        console.error('Failed to send OTP email:', error);
        throw new Error('OTP email sending failed'); // propagate error to backend
    }
};

// Send OTP via phone (stub)
exports.sendOtpPhone = async (phone, otp) => {
    console.log(`Sending OTP ${otp} to phone ${phone}`);
    // integrate actual SMS service here
};
