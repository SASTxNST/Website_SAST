import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Eye, EyeOff } from "lucide-react";
import { showToast } from "../main.jsx"; // import global toast

export default function Register() {
  const [method, setMethod] = useState("email");
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profileImg: null,
    password: "",
    confirmPassword: "",
  });

  // Send OTP
  const handleSendOtp = () => {
    if (!email) {
      showToast("Please enter your email!", "error");
      return;
    }
    console.log(`Sending OTP to ${email}`);
    showToast(`OTP sent to ${email}`);
    setStep(2);
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    if (!otp) {
      showToast("Please enter the OTP!", "error");
      return;
    }
    console.log("Verifying OTP", otp);
    showToast("OTP verified successfully!");
    setStep(3);
  };

  // Register user
  const handleRegister = () => {
    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }
    const payload = { ...formData, email };
    console.log("Registering user:", payload);
    showToast("Registered successfully!");
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </button>
                </div>
              )}

              {/* Step 2: Verify OTP */}
              {step === 2 && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    Verify OTP
                  </h2>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
                    onClick={handleVerifyOtp}
                  >
                    Verify OTP
                  </button>
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

                  {/* Profile Image */}
                  <input
                    type="file"
                    className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 dark:bg-gray-800 dark:text-gray-100"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profileImg: e.target.files[0],
                      })
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
              href="/login"
              className="text-purple-600 hover:underline dark:text-purple-400"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
