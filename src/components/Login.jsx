import React, { useState } from "react";
import "../index.css";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (password) =>
  password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);

const getFriendlyError = (err) => {
  if (!err || !err.code) return "An error occurred. Please try again.";
  switch (err.code) {
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/user-disabled":
      return "This account has been disabled by an administrator.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/email-already-in-use":
      return "Email is already in use. Try logging in or resetting your password.";
    case "auth/weak-password":
      return "Password is too weak (min 8 chars, letters & numbers).";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/internal-error":
      return "Internal error. Please try again.";
    case "auth/operation-not-allowed":
      return "This operation is not allowed. Please contact support.";
    case "auth/invalid-credential":
      return "Invalid credentials. Please check your email and password.";
    default:
      // Show the raw message for unknown errors
      return err.message || "An error occurred. Please try again.";
  }
};

const Login = () => {
  const { currentUser, login, signup, logout, updateProfileData } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phone: "",
  });

  const resetForm = () =>
    setForm({
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error on input change
  };

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    // Optionally validate fields here
    try {
      await updateProfileData({
        displayName: `${profileForm.firstName} ${profileForm.lastName}`,
        dob: profileForm.dob,
        phone: profileForm.phone,
      });
      navigate("/profile");
    } catch (err) {
      setError("Failed to update profile. Try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(form.password)) {
      setError(
        "Password must be at least 8 characters and include letters and numbers."
      );
      return;
    }
    if (!isLogin && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!isLogin && !form.username.trim()) {
      setError("Username is required.");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await signup(form.email, form.password, form.username);
        setShowProfileForm(true);
        setProfileForm({
          firstName: "",
          lastName: "",
          email: form.email,
          dob: "",
          phone: "",
        });
        return; // Don't proceed to login UI
      }
    } catch (err) {
      setError(getFriendlyError(err));
    } finally {
      setLoading(false);
    }
  };

  // Show profile completion form if showProfileForm is true, regardless of currentUser
  if (showProfileForm) {
    return (
      <div className="login-body">
        <div className="login-wrapper">
          <div className="login-box animate-login">
            <h1 className="login-title">Complete Your Profile</h1>
            <form className="login-form" onSubmit={handleProfileSubmit}>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  value={profileForm.firstName}
                  onChange={handleProfileChange}
                  disabled={loading}
                  style={{ flex: 1 }}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  value={profileForm.lastName}
                  onChange={handleProfileChange}
                  disabled={loading}
                  style={{ flex: 1 }}
                />
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={profileForm.email}
                  disabled
                  style={{ flex: 1 }}
                />
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <input
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                  required
                  value={profileForm.dob}
                  onChange={handleProfileChange}
                  disabled={loading}
                  style={{ flex: 1 }}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  value={profileForm.phone}
                  onChange={handleProfileChange}
                  disabled={loading}
                  style={{ flex: 1 }}
                />
              </div>
              {error && (
                <div style={{ color: "red", marginBottom: 8 }}>{error}</div>
              )}
              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? (
                  <span className="spinner" style={{ marginRight: 8 }} />
                ) : null}
                Save & Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (currentUser) {
    return (
      <div className="login-body">
        <div className="login-wrapper">
          <div className="login-box animate-login">
            <h1 className="login-title">
              Hi {currentUser.displayName || currentUser.email}!
            </h1>
            <button
              className="auth-button"
              onClick={() => {
                logout();
                resetForm();
                setError("");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-body">
      <div className="login-wrapper">
        <div className="login-box animate-login">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
              disabled={loading}
            >
              Log In
            </button>
            <button
              className={`auth-tab ${!isLogin ? "active" : ""}`}
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
              disabled={loading}
            >
              Sign Up
            </button>
          </div>

          <h1 className="login-title">
            {isLogin ? "Welcome Back" : "Join Us"}
          </h1>
          <p className="login-subtitle">
            {isLogin ? "Log in to your account" : "Create a new account"}
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
            {!isLogin && (
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={form.username}
                onChange={handleChange}
                disabled={loading}
              />
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
            )}
            {error && (
              <div style={{ color: "red", marginBottom: 8 }}>{error}</div>
            )}
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? (
                <span className="spinner" style={{ marginRight: 8 }} />
              ) : null}
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>

          {isLogin ? (
            <p className="signup-text">
              Don’t have an account?{" "}
              <span
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                }}
                style={{ cursor: loading ? "not-allowed" : "pointer" }}
              >
                Sign up
              </span>
            </p>
          ) : (
            <p className="signup-text">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                }}
                style={{ cursor: loading ? "not-allowed" : "pointer" }}
              >
                Log in
              </span>
            </p>
          )}
          {loading && (
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <span
                className="spinner"
                style={{
                  display: "inline-block",
                  width: 24,
                  height: 24,
                  border: "3px solid #ccc",
                  borderTop: "3px solid #333",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              <style>
                {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
              </style>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
