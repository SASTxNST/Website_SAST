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
// Gate verbose logging behind NODE_ENV so production doesn't leak transport debug info.
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use TLS
    auth: {
        user: process.env.OTP_EMAIL_USER,
        pass: process.env.OTP_EMAIL_PASS // Gmail App Password
    },
    logger: process.env.NODE_ENV !== 'production',
    debug: process.env.NODE_ENV !== 'production'
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
        // Do not log OTPs or sensitive email content. Log only that an email was sent.
        console.log(`OTP email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('Failed to send OTP email:', error);
        throw new Error('OTP email sending failed'); // propagate error to backend
    }
};

// Initialize Twilio client
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Validate phone number format
const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
};

// Send OTP via phone using Twilio
exports.sendOtpPhone = async (phone, otp) => {
    try {
        // Validate phone number format
        if (!isValidPhoneNumber(phone)) {
            throw new Error('Invalid phone number format. Must be in E.164 format (e.g., +1234567890)');
        }

        // Send SMS using Twilio
        const message = await client.messages.create({
            body: `Your SAST secure access code is: ${otp}. Valid for 5 minutes. If you did not request this code, please ignore.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        });

        console.log(`OTP ${otp} sent to phone ${phone}. Message SID: ${message.sid}`);
        return true;
    } catch (error) {
        console.error('Failed to send OTP SMS:', error);
        throw new Error(error.message || 'OTP SMS sending failed');
    }
};
