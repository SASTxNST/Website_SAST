/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { BASE_URL } from "../api";
import { showToast } from "../main.jsx";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { setLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Safe parsing
        const text = await res.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          console.error("Server response is not JSON:", text);
          showToast("Invalid server response", "error");
          setLoading(false);
          return;
        }

        if (res.ok) {
          setProfile({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
          });
        } else {
          showToast(data.message || "Failed to fetch profile", "error");
        }
      } catch (err) {
        console.error(err);
        showToast("Server error. Try again.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${BASE_URL}/users/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        setLoggedIn(false);
        showToast("Logged out successfully!", "success");
        navigate("/login");
      } else {
        const text = await res.text();
        let data;
        try { data = JSON.parse(text); } catch { data = {}; }
        showToast(data.message || "Logout failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error. Try again.", "error");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center text-gray-700 dark:text-gray-200">
          Loading profile...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          My Profile
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
            Personal Information
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Full Name</p>
              <p className="text-gray-800 dark:text-gray-100">{profile.name}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-gray-800 dark:text-gray-100">{profile.email}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Phone</p>
              <p className="text-gray-800 dark:text-gray-100">{profile.phone || "Not set"}</p>
            </div>
          </div>

          <div className="flex justify-between mt-6 gap-4">
            <button
              className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex-1"
              onClick={() => showToast("Edit profile feature coming soon!", "info")}
            >
              Edit Profile
            </button>

            <button
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
