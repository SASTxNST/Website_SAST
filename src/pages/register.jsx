/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Rocket, UserPlus, Mail, Lock } from "lucide-react";
import { showToast } from "../main.jsx";
import { BASE_URL } from "../api";

export default function Register() {
  const [method, setMethod] = useState("email");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [loader, setLoader] = useState(false);
  const [sendOTP, setSendOTP] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Timer effect for resend OTP
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  // Email validation
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle sending OTP
  const handleSendOtp = async () => {
    const cleanEmail = formData.email.trim();

    if (!cleanEmail) {
      showToast("Please enter your email!", "error");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      showToast("Please enter a valid email!", "error");
      return;
    }

    try {
      setLoader(true);

      // Check if user already exists
      const checkRes = await fetch(`${BASE_URL}/users/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const checkData = await checkRes.json();

      if (checkData.exists) {
        showToast("User already exists!", "error");
        return;
      }

      // Send OTP if user does not exist
      const res = await fetch(`${BASE_URL}/otp/email/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        showToast(`OTP sent to ${cleanEmail}`, "success");
        setSendOTP(true);
        setStep(2);
        setResendTimer(60);
      } else {
        showToast(data.message || "Failed to send OTP", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error. Try again.", "error");
    } finally {
      setLoader(false);
    }
  };

  // Handle resending OTP
  const handleResendOtp = async () => {
    if (!sendOTP) {
      showToast("Please request OTP first!", "error");
      return;
    }

    if (resendTimer > 0) {
      showToast(`Please wait ${resendTimer}s before resending OTP`, "error");
      return;
    }

    if (!isValidEmail(formData.email.trim())) {
      showToast("Please enter a valid email!", "error");
      return;
    }

    try {
      setLoader(true);
      const res = await fetch(`${BASE_URL}/otp/email/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        showToast(`OTP resent to ${formData.email.trim()}`, "success");
        setResendTimer(60);
        setSendOTP(true);
      } else {
        showToast(data.message || "Failed to resend OTP", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error. Try again.", "error");
    } finally {
      setLoader(false);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    if (!otp) {
      showToast("Please enter the OTP!", "error");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/otp/email/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email.trim(), otp: otp.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        showToast(data.message || "OTP verified successfully!", "success");
        setStep(3);
      } else {
        showToast(data.message || "Invalid OTP", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error. Try again.", "error");
    }
  };

  // Handle registration
  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }

    if (!formData.email) {
      showToast("Email is required!", "error");
      return;
    }

    try {
      const payload = {
        email: formData.email.trim(),
        password: formData.password,
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim(),
        phone: "",
      };
      const res = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.user) {
        showToast("Registered successfully!", "success");
        localStorage.setItem("token", result.token);
        navigate("/login");
      } else {
        showToast(result.message || "Registration failed!", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error. Try again.", "error");
    } finally {
      setLoader(false);
    }
  };

  const starPositions = React.useMemo(() => {
    return Array.from({ length: 30 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
    }));
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-up {
          animation: fadeInUp 1s ease-out;
        }

        .space-container {
          min-height: 100vh;
          background: #000;
          color: #fff;
          overflow: hidden;
          position: relative;
        }

        .space-bg-layer {
          position: fixed;
          inset: 0;
          z-index: 0;
        }

        .gradient-layer {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(30, 58, 138, 0.2) 0%, #000 50%, rgba(88, 28, 135, 0.2) 100%);
        }

        .radial-layer {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(0,161,255,0.1), transparent 50%);
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: #60a5fa;
          border-radius: 50%;
          opacity: 0.6;
        }

        .content-wrapper {
          position: relative;
          z-index: 10;
        }

        .register-card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 48px;
          transition: all 0.3s;
        }

        .register-card:hover {
          border-color: rgba(59,130,246,0.3);
          box-shadow: 0 10px 40px rgba(59,130,246,0.2);
        }

        .input-field {
          width: 100%;
          padding: 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          color: #fff;
          font-size: 16px;
          outline: none;
          transition: all 0.3s;
        }

        .input-field:focus {
          border-color: rgba(59,130,246,0.5);
          background: rgba(255,255,255,0.08);
        }

        .input-field::placeholder {
          color: #9ca3af;
        }

        .btn-primary {
          width: 100%;
          background: linear-gradient(90deg, #3b82f6 0%, #6366f1 100%);
          color: #fff;
          font-weight: 700;
          font-size: 18px;
          padding: 16px;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(59,130,246,0.4);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          width: 100%;
          background: rgba(255,255,255,0.05);
          color: #fff;
          font-weight: 600;
          font-size: 16px;
          padding: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .btn-secondary:hover:not(:disabled) {
          background: rgba(255,255,255,0.1);
          border-color: rgba(59,130,246,0.3);
        }

        .btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .method-toggle {
          display: flex;
          background: rgba(255,255,255,0.05);
          border-radius: 16px;
          padding: 4px;
          gap: 4px;
        }

        .method-btn {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          background: transparent;
          color: #d1d5db;
        }

        .method-btn.active {
          background: linear-gradient(90deg, #3b82f6 0%, #6366f1 100%);
          color: #fff;
          box-shadow: 0 4px 12px rgba(59,130,246,0.4);
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(59,130,246,0.1);
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 50px;
          padding: 8px 16px;
          margin-bottom: 24px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top: 2px solid #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      `}</style>

      <Navbar />

      <div className="space-container">
        {/* Animated Background */}
        <div className="space-bg-layer">
          <div className="gradient-layer"></div>
          <div className="radial-layer"></div>
          {starPositions.map((star, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="content-wrapper">
          <div
            style={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              paddingTop: "120px",
              paddingBottom: "80px",
            }}
          >
            <div
              className="fade-in-up"
              style={{
                width: "100%",
                maxWidth: "480px",
              }}
            >
              {/* Badge */}
              <div style={{ textAlign: "center" }}>
                <div className="badge">
                  <Rocket style={{ width: 16, height: 16, color: "#60a5fa" }} />
                  <span style={{ color: "#93c5fd", fontSize: 14, fontWeight: 500 }}>
                    Join SAST Community
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1
                style={{
                  fontSize: "48px",
                  fontWeight: 700,
                  marginBottom: "16px",
                  background: "linear-gradient(to right, #fff, #dbeafe, #93c5fd)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "center",
                  lineHeight: 1.1,
                }}
              >
                Create Account
              </h1>
              <p
                style={{
                  color: "#d1d5db",
                  textAlign: "center",
                  marginBottom: "48px",
                  fontSize: "18px",
                }}
              >
                Start your journey into space exploration
              </p>

              {/* Register Card */}
              <div className="register-card">
                {/* Method Toggle */}
                <div className="method-toggle" style={{ marginBottom: "32px" }}>
                  <button
                    onClick={() => {
                      setMethod("email");
                      setStep(1);
                    }}
                    className={`method-btn ${method === "email" ? "active" : ""}`}
                  >
                    Email
                  </button>
                  <button
                    onClick={() =>
                      showToast("Phone registration is not implemented yet.", "error")
                    }
                    className={`method-btn ${method === "phone" ? "active" : ""}`}
                  >
                    Phone
                  </button>
                </div>

                {/* EMAIL REGISTRATION FLOW */}
                {method === "email" && (
                  <>
                    {/* Step 1: Enter Email */}
                    {step === 1 && (
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#d1d5db",
                            marginBottom: "12px",
                          }}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="input-field"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          style={{ marginBottom: "24px" }}
                        />
                        <button
                          className="btn-primary"
                          onClick={handleSendOtp}
                          disabled={!isValidEmail(formData.email) || loader}
                        >
                          {loader ? (
                            <>
                              <div className="spinner"></div>
                              Sending OTP...
                            </>
                          ) : (
                            <>
                              <Mail size={20} />
                              Send OTP
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Step 2: Verify OTP */}
                    {step === 2 && (
                      <div>
                        <p
                          style={{
                            textAlign: "center",
                            marginBottom: "24px",
                            color: "#d1d5db",
                          }}
                        >
                          OTP sent to{" "}
                          <span style={{ color: "#60a5fa", fontWeight: 600 }}>
                            {formData.email}
                          </span>
                        </p>
                        <label
                          style={{
                            display: "block",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#d1d5db",
                            marginBottom: "12px",
                          }}
                        >
                          Enter OTP
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Enter 6-digit OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          style={{ marginBottom: "16px" }}
                        />
                        <button
                          className="btn-primary"
                          onClick={handleVerifyOtp}
                          style={{ marginBottom: "12px" }}
                        >
                          <Lock size={20} />
                          Verify OTP
                        </button>
                        <button
                          className="btn-secondary"
                          disabled={loader || resendTimer > 0}
                          onClick={handleResendOtp}
                        >
                          {loader ? (
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                              <div className="spinner"></div>
                              Resending...
                            </span>
                          ) : resendTimer > 0 ? (
                            `Resend OTP in ${resendTimer}s`
                          ) : (
                            "Resend OTP"
                          )}
                        </button>
                        <p
                          style={{
                            marginTop: "24px",
                            textAlign: "center",
                            color: "#9ca3af",
                            fontSize: "14px",
                          }}
                        >
                          Wrong email?{" "}
                          <span
                            onClick={() => setStep(1)}
                            style={{
                              color: "#60a5fa",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            Change email
                          </span>
                        </p>
                      </div>
                    )}

                    {/* Step 3: Complete Profile */}
                    {step === 3 && (
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#d1d5db",
                            marginBottom: "12px",
                          }}
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                          style={{ marginBottom: "16px" }}
                        />

                        <label
                          style={{
                            display: "block",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#d1d5db",
                            marginBottom: "12px",
                          }}
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          style={{ marginBottom: "16px" }}
                        />

                        <label
                          style={{
                            display: "block",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#d1d5db",
                            marginBottom: "12px",
                          }}
                        >
                          Password
                        </label>
                        <div style={{ position: "relative", marginBottom: "16px" }}>
                          <input
                            type={showPassword ? "text" : "password"}
                            className="input-field"
                            placeholder="Create a strong password"
                            value={formData.password}
                            onChange={(e) =>
                              setFormData({ ...formData, password: e.target.value })
                            }
                            style={{ paddingRight: "48px" }}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              position: "absolute",
                              right: "16px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              background: "none",
                              border: "none",
                              color: "#60a5fa",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>

                        <label
                          style={{
                            display: "block",
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#d1d5db",
                            marginBottom: "12px",
                          }}
                        >
                          Confirm Password
                        </label>
                        <div style={{ position: "relative", marginBottom: "24px" }}>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="input-field"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                              })
                            }
                            style={{ paddingRight: "48px" }}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            style={{
                              position: "absolute",
                              right: "16px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              background: "none",
                              border: "none",
                              color: "#60a5fa",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>

                        <button className="btn-primary" onClick={handleRegister}>
                          <UserPlus size={20} />
                          Create Account
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Login Link */}
                <p
                  style={{
                    marginTop: "32px",
                    textAlign: "center",
                    color: "#9ca3af",
                    fontSize: "16px",
                  }}
                >
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    style={{
                      color: "#60a5fa",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#93c5fd")}
                    onMouseLeave={(e) => (e.target.style.color = "#60a5fa")}
                  >
                    Login here
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}