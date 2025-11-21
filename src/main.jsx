/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./AppContent.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { MessagesProvider } from "./context/MessagesContext.jsx";
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

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <MessagesProvider>
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
        </MessagesProvider>
      </SettingsProvider>
    </QueryClientProvider>
  </Router>
);
