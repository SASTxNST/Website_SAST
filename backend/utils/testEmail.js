/* eslint-disable no-undef */
require('dotenv').config();
const nodemailer = require('nodemailer');

// Safety: prevent accidental sending. To run this test script, set RUN_TEST_EMAIL=1 in your env.
if (!process.env.RUN_TEST_EMAIL) {
    console.log('testEmail.js is disabled by default. Set RUN_TEST_EMAIL=1 to send a test email.');
    process.exit(0);
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.OTP_EMAIL_USER,
        pass: process.env.OTP_EMAIL_PASS
    },
    logger: process.env.NODE_ENV !== 'production',
    debug: process.env.NODE_ENV !== 'production'
});

transporter.sendMail({
    from: process.env.OTP_EMAIL_USER,
    to: process.env.TEST_EMAIL_TO || process.env.OTP_EMAIL_USER,
    subject: 'Test Email',
    text: 'This is a test email from OTP service.'
})
.then(info => console.log('Email sent successfully:', info))
.catch(err => console.error('Error sending email:', err));
