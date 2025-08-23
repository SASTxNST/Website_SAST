/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { showToast } from "../main.jsx";
import { BASE_URL } from "../api";
import Footer from "../components/footer.jsx"

export default function Register() {
  const [method, setMethod] = useState("email");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [loader, setLoader] = useState(false);
  const [sendOTP, setSendOTP] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="w-full max-w-md p-12 rounded-3xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/20 dark:border-gray-700 shadow-2xl flex flex-col gap-6">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
            Register
          </h2>

          {/* Method Toggle */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-8 py-3 w-24 rounded-xl font-semibold transition-all duration-300 ${
                method === "email"
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() => { setMethod("email"); setStep(1); }}
            >
              Email
            </button>
            <button
              className="px-8 py-3 w-24 rounded-xl font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-md transition-all duration-300"
              onClick={() =>
                showToast("Phone registration is not implemented yet.", "error")
              }
            >
              Phone
            </button>
          </div>

          {/* Step 1: Email Input */}
          {method === "email" && step === 1 && (
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 shadow-sm"
              />
              <button
                onClick={handleSendOtp}
                disabled={!isValidEmail(formData.email) || loader}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
              >
                {loader ? "Sending OTP..." : "Send OTP"}
              </button>
            </div>
          )}

          {/* Step 2: OTP Verification */}
          {method === "email" && step === 2 && (
            <div className="flex flex-col gap-4">
              <p className="text-gray-700 dark:text-gray-300 text-center">
                OTP sent to <span className="font-semibold">{formData.email}</span>
              </p>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 shadow-sm"
              />
              <button
                onClick={handleVerifyOtp}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Verify OTP
              </button>
              <button
                onClick={handleResendOtp}
                disabled={loader || resendTimer > 0}
                className="w-full py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                {loader
                  ? "Resending OTP..."
                  : resendTimer > 0
                  ? `Resend OTP in ${resendTimer}s`
                  : "Resend OTP"}
              </button>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Want to change your email?{" "}
                <span className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline" onClick={() => setStep(1)}>
                  Click Here
                </span>
              </p>
            </div>
          )}

          {/* Step 3: Complete Profile */}
          {method === "email" && step === 3 && (
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 shadow-sm"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 shadow-sm"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-all duration-300"
                >
                  {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-all duration-300"
                >
                  {showConfirmPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
              <button
                onClick={handleRegister}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Register
              </button>
            </div>
          )}

          <p className="text-gray-700 dark:text-gray-300 text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
