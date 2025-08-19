const User = require('../models/user'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 


// Token generation 
const generateToken = (user) => { 
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  ); 
};


// ✅ Check Email if already exists
const checkEmailExistsHandler = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ where: { email } });
    return res.status(200).json({ exists: !!user });
  } 
  catch (err) {
    console.error("Check Email Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


// ✅ Register User
const registerUser = async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      phone = null,
      gender = null,
      dob = null,
      addresses = [],
    } = req.body;

    // Required fields check
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Name, Email and Password are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      phone,
      gender,
      dob,
      addresses,
    });

    const token = generateToken(newUser);

    return res.status(201).json({ user: newUser, token });
  } 
  catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const messages = err.errors.map(e => e.message);
      return res.status(400).json({ errors: messages });
    }
    console.error('Register User Error:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// ✅ Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(foundUser);

    return res.status(200).json({ user: foundUser, token });
  } 
  catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};


// ✅ Logout User
const logoutUser = (req, res) => {
  res.status(200).json({ message: 'User logged out successfully' });
};


// ✅ Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const userProfile = await User.findByPk(userId);
    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userProfile);
  } 
  catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// ✅ Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email, phone, name, gender, dob, addresses } = req.body;

    const userProfile = await User.findByPk(userId);
    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    userProfile.email = email || userProfile.email;
    userProfile.phone = phone || userProfile.phone;
    userProfile.name = name || userProfile.name;
    userProfile.gender = gender || userProfile.gender;
    userProfile.dob = dob || userProfile.dob;
    userProfile.addresses = addresses || userProfile.addresses;

    await userProfile.save();

    res.status(200).json(userProfile);
  } 
  catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// ✅ Delete User Account
const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const userProfile = await User.findByPk(userId);
    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    await userProfile.destroy();

    res.status(200).json({ message: 'User account deleted successfully' });
  } 
  catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = {
  checkEmailExistsHandler,
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
};
