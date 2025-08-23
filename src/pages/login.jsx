/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../main.jsx";
import { BASE_URL } from "../api";

export default function Login() {
  const [method, setMethod] = useState("email"); // email | phone
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
  });

  // Email validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Phone validation (basic: 10 digits)
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  // Handle Login
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-500 to-indigo-600 dark:from-gray-900 dark:to-gray-800 p-4 transition-colors duration-300">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
            Login
          </h2>

          {/* Switch between Email / Phone */}
          <div className="flex mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setMethod("email")}
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
                // setMethod("phone")
                showToast("Phone login is not implemented yet.", "error")
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

          {/* Email Login */}
          {method === "email" && (
            <>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </>
          )}

          {/* Phone Login */}
          {method === "phone" && (
            <>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-gray-100"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </>
          )}

          {/* Password Input */}
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

          <button
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 flex justify-center items-center gap-2"
            onClick={handleLogin}
            disabled={loader}
          >
            {loader ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <a
              onClick={() => navigate("/register")}
              className="text-purple-600 hover:underline dark:text-purple-400"
            >
              <span className="hover:text-blue-500 hover:underline">
                Register
              </span>
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
