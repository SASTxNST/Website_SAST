const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Token Generation
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Register User
const registerUser = async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      phone,
    });

    const token = generateToken(newUser);

    return res.status(201).json({ user: newUser, token });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Login User
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
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Logout User
const logoutUser = (req, res) => {
  // Optional: Invalidate token if using token blacklist
  res.status(200).json({ message: 'User logged out successfully' });
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const userProfile = await User.findByPk(userId);
    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email, phone } = req.body;

    const userProfile = await User.findByPk(userId);
    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    userProfile.email = email || userProfile.email;
    userProfile.phone = phone || userProfile.phone;
    await userProfile.save();

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete User Account
const deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const userProfile = await User.findByPk(userId);
    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    await userProfile.destroy();

    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
};
