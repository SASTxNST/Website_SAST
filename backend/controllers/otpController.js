const {
    generateOtp,
    validateOtp,
    sendOtpEmail,
    sendOtpPhone
} = require('../utils/otpService');

// Email OTP
exports.generateEmailOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = await generateOtp(email);
        await sendOtpEmail(email, otp);
        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.validateEmailOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const valid = await validateOtp(email, otp);

        if (!valid) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Phone OTP
exports.generatePhoneOtp = async (req, res) => {
    try {
        const { phone } = req.body;
        const otp = await generateOtp(phone);
        await sendOtpPhone(phone, otp);
        res.status(200).json({ message: 'OTP sent to phone' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.validatePhoneOtp = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        const valid = await validateOtp(phone, otp);

        if (!valid) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

