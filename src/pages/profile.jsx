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
    gender: "",
    dob: "",
    createdAt: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

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
            gender: data.gender || "Not set",
            dob: data.dob || "Not set",
            createdAt: data.createdAt
              ? new Date(data.createdAt).toLocaleDateString()
              : "Not set",
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
        navigate("/");
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="w-full max-w-md p-12 rounded-3xl bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg border border-white/20 dark:border-gray-700 shadow-2xl flex flex-col gap-6">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white text-center">
            My Profile
          </h1>

          <div className="space-y-4">
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
            <div>
              <p className="text-gray-500 dark:text-gray-400">Gender</p>
              <p className="text-gray-800 dark:text-gray-100">{profile.gender}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Date of Birth</p>
              <p className="text-gray-800 dark:text-gray-100">{profile.dob}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Created At</p>
              <p className="text-gray-800 dark:text-gray-100">{profile.createdAt}</p>
            </div>
          </div>

          <div className="flex justify-between mt-6 gap-4">
            <button
              className="bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors flex-1 shadow-md"
              onClick={() => showToast("Edit profile feature coming soon!", "info")}
            >
              Edit Profile
            </button>

            <button
              className="bg-red-600 text-white py-3 px-4 rounded-xl hover:bg-red-700 transition-colors flex-1 shadow-md"
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
