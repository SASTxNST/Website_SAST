/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../main.jsx";
import { BASE_URL } from "../api";
import { useAuth } from "../context/authContext";

export default function Login() {
  const [method, setMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleLogin = async () => {
    try {
      if (method === "email") {
        if (!isValidEmail(formData.email.trim())) {
          showToast("Please enter a valid email!", "error");
          return;
        }
      } else if (method === "phone") {
        showToast("Phone login is not implemented yet.", "error");
        return;
      }

      if (!formData.password) {
        showToast("Password is required!", "error");
        return;
      }

      setLoader(true);

      const loginUrl = `${BASE_URL.replace(/\/$/, "")}/users/login`;
      const res = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const result = await res.json();

      if (res.ok && result.token) {
        setLoggedIn(true);
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="w-full max-w-md p-12 rounded-3xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/20 dark:border-gray-700 shadow-2xl flex flex-col gap-8">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
            Welcome Back
          </h2>

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-8 py-3 w-20 rounded-xl font-semibold transition-all duration-300 ${
                method === "email"
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() => setMethod("email")}
            >
              Email
            </button>
            <button
              className="px-8 py-3 w-20 rounded-xl font-semibold bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-md transition-all duration-300"
              onClick={() =>
                showToast("Phone login is not implemented yet.", "error")
              }
            >
              Phone
            </button>
          </div>

          {/* Email Login */}
          {method === "email" && (
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 shadow-sm"
            />
          )}
          
          {/* Password Input */}
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

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loader}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform duration-300"
          >
            {loader ? "Logging in..." : "Login"}
          </button>

          <p className="text-gray-700 dark:text-gray-300 text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
