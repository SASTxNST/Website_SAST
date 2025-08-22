/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
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
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

      // 1️⃣ Check if user already exists
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

      // 2️⃣ Send OTP if user does not exist
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
        setSendOTP(true); // keep track that OTP was sent
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

      console.log("Register Payload:", payload); // 🐞 Debugging

      const res = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.user) {
        showToast("Registered successfully!", "success");
        localStorage.setItem("token", result.token);
        console.log(result.user);
        navigate("/login");
      } 
      else {
        showToast(result.message || "Registration failed!", "error");
      }
    } 
    catch (err) {
      console.error(err);
      showToast("Server error. Try again.", "error");
    } 
    finally {
      setLoader(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-gray-900 dark:to-gray-800 p-4 transition-colors duration-300">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          {/* Switch between Email / Phone */}
          <div className="flex mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => {
                setMethod("email");
                setStep(1);
              }}
              className={`flex-1 py-2 rounded-lg font-medium transition-colors duration-200 ${
                method === "email"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              Email
            </button>
            <button
              onClick={() =>
                showToast("Phone registration is not implemented yet.", "error")
              }
              className={`flex-1 py-2 rounded-lg font-medium transition-colors duration-200 ${
                method === "phone"
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
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
                  <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    Register with Email
                  </h2>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <button
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 flex justify-center items-center gap-2"
                    onClick={handleSendOtp}
                    disabled={!isValidEmail(formData.email) || loader}
                  >
                    {loader ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Sending OTP...
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </div>
              )}

              {/* Step 2: Verify OTP */}
              {step === 2 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    Verify OTP
                  </h2>
                  <p className="text-center">
                    Your Email is{" "}
                    <span className="text-blue-500">{formData.email}</span>
                  </p>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 mb-2"
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP
                  </button>
                  <button
                    className={`w-full py-2 rounded-lg font-semibold ${
                      resendTimer > 0 || loader
                        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                    disabled={loader || resendTimer > 0}
                    onClick={handleResendOtp}
                  >
                    {loader ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Resending OTP...
                      </span>
                    ) : resendTimer > 0 ? (
                      `Resend OTP in ${resendTimer}s`
                    ) : (
                      "Resend OTP"
                    )}
                  </button>
                  <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
                    Want to Change your Email?{" "}
                    <a
                      onClick={() => setStep(1)}
                      className="text-purple-600 dark:text-purple-400 "
                    >
                      <span className="hover:text-blue-500 hover:underline">
                        Click Here
                      </span>
                    </a>
                  </p>
                </div>
              )}

              {/* Step 3: Complete Profile */}
              {step === 3 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    Complete Your Profile
                  </h2>

                  {/* First Name */}
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />

                  {/* Last Name */}
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />

                  {/* Password */}
                  <div className="relative mb-4">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-gray-100"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative mb-4">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-gray-100"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>

                  <button
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
                    onClick={handleRegister}
                  >
                    Register
                  </button>
                </div>
              )}
            </>
          )}

          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")}
              className="text-purple-600 hover:underline dark:text-purple-400"
            >
              <span className="hover:text-blue-500 hover:underline">Login</span>
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
