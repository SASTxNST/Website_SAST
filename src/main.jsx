/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./AppContent.jsx";
import { Toaster, toast } from "react-hot-toast";

// Global toast queue for max 3 toasts
const toastQueue = [];

export const showToast = (message, type = "success") => {
  if (toastQueue.length >= 3) {
    const oldest = toastQueue.shift();
    toast.dismiss(oldest);
  }
  const id = type === "success" ? toast.success(message) : toast.error(message);
  toastQueue.push(id);
  return id;
};

// Optional: attach globally
window.showToast = showToast;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    {/* Global Toaster */}
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff",
          textAlign: "center",
          justifyContent: "center",
        },
        success: { duration: 1500 },
        error: { duration: 2500 },
      }}
    />
    <AppContent />
  </Router>
);
