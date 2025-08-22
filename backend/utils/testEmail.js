/* eslint-disable no-undef */
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.OTP_EMAIL_USER,
        pass: process.env.OTP_EMAIL_PASS
    },
    logger: true,
    debug: true
});

transporter.sendMail({
    from: process.env.OTP_EMAIL_USER,
    to: 'your_email@example.com',  // replace with your Gmail
    subject: 'Test Email',
    text: 'This is a test email from OTP service.'
})
.then(info => console.log('Email sent successfully:', info))
.catch(err => console.error('Error sending email:', err));
