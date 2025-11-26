/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Eye, EyeOff, Rocket, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../main.jsx";
import { BASE_URL } from "../api";

export default function Login() {
  const [method, setMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleLogin = async () => {
    try {
      if (method === "email") {
        if (!isValidEmail(formData.email)) {
          showToast("Please enter a valid email!", "error");
          return;
        }
        if (!formData.password) {
          showToast("Password is required!", "error");
          return;
        }
      } else if (method === "phone") {
        if (!isValidPhone(formData.phone)) {
          showToast("Please enter a valid 10-digit phone number!", "error");
          return;
        }
        if (!formData.password) {
          showToast("Password is required!", "error");
          return;
        }
      }

      setLoader(true);

      const payload =
        method === "email"
          ? { email: formData.email.trim(), password: formData.password }
          : { phone: formData.phone.trim(), password: formData.password };

      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.token) {
        showToast("Login successful!", "success");
        localStorage.setItem("token", result.token);
        navigate("/");
      } else {
        showToast(result.message || "Invalid credentials", "error");
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

        .login-card {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 48px;
          transition: all 0.3s;
        }

        .login-card:hover {
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
                    SAST Portal Access
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
                Welcome Back
              </h1>
              <p
                style={{
                  color: "#d1d5db",
                  textAlign: "center",
                  marginBottom: "48px",
                  fontSize: "18px",
                }}
              >
                Login to access your space exploration dashboard
              </p>

              {/* Login Card */}
              <div className="login-card">
                {/* Method Toggle */}
                <div className="method-toggle" style={{ marginBottom: "32px" }}>
                  <button
                    onClick={() => setMethod("email")}
                    className={`method-btn ${method === "email" ? "active" : ""}`}
                  >
                    Email
                  </button>
                  <button
                    onClick={() => 
                      showToast("Phone login is not implemented yet.", "error")
                    }
                    className={`method-btn ${method === "phone" ? "active" : ""}`}
                  >
                    Phone
                  </button>
                </div>

                {/* Email Input */}
                {method === "email" && (
                  <div style={{ marginBottom: "24px" }}>
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
                    />
                  </div>
                )}

                {/* Phone Input */}
                {method === "phone" && (
                  <div style={{ marginBottom: "24px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#d1d5db",
                        marginBottom: "12px",
                      }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                )}

                {/* Password Input */}
                <div style={{ marginBottom: "32px" }}>
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
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input-field"
                      placeholder="Enter your password"
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
                </div>

                {/* Login Button */}
                <button
                  className="btn-primary"
                  onClick={handleLogin}
                  disabled={loader}
                >
                  {loader ? (
                    <>
                      <div className="spinner"></div>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <LogIn size={20} />
                      Login
                    </>
                  )}
                </button>

                {/* Register Link */}
                <p
                  style={{
                    marginTop: "32px",
                    textAlign: "center",
                    color: "#9ca3af",
                    fontSize: "16px",
                  }}
                >
                  Don't have an account?{" "}
                  <span
                    onClick={() => navigate("/register")}
                    style={{
                      color: "#60a5fa",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#93c5fd")}
                    onMouseLeave={(e) => (e.target.style.color = "#60a5fa")}
                  >
                    Register here
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