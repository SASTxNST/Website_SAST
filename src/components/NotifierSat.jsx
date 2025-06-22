import React, { useState, useEffect } from "react";
import { Satellite } from "lucide-react";
import { useSatelliteMonitor } from "../hooks/useSatelliteMonitor";

function NotifierSat() {
  const { notification, clearNotification } = useSatelliteMonitor();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => clearNotification(), 300);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => clearNotification(), 300);
  };

  return (
    <>
      {/* Notification Toast - Only shows when needed */}
      {notification && (
        <div
          style={{
            position: "fixed",
            top: "16px",
            right: "16px",
            zIndex: 9999,
            transform: isVisible ? "translateX(0)" : "translateX(100%)",
            opacity: isVisible ? 1 : 0,
            transition: "all 0.3s ease-in-out",
          }}
        >
          <div
            style={{
              background: "linear-gradient(to right, #1e293b, #1e40af)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "8px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              padding: "16px",
              minWidth: "320px",
              maxWidth: "384px",
              backdropFilter: "blur(4px)",
              position: "relative",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    padding: "8px",
                    background: "rgba(59, 130, 246, 0.2)",
                    borderRadius: "50%",
                  }}
                >
                  <Satellite style={{ color: "#60a5fa" }} size={20} />
                </div>
                <div>
                  <h3
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: "14px",
                      margin: 0,
                    }}
                  >
                    Satellite Pass
                  </h3>
                  <p
                    style={{
                      color: "#93c5fd",
                      fontSize: "12px",
                      margin: 0,
                    }}
                  >
                    Now overhead
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                style={{
                  color: "#9ca3af",
                  background: "none",
                  border: "none",
                  padding: "4px",
                  cursor: "pointer",
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => (e.target.style.color = "white")}
                onMouseLeave={(e) => (e.target.style.color = "#9ca3af")}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ fontSize: "24px" }}>🛰️</span>
                <span
                  style={{
                    color: "white",
                    fontWeight: "500",
                  }}
                >
                  {notification.satelliteName}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                  fontSize: "14px",
                }}
              >
                <div
                  style={{
                    background: "rgba(30, 58, 138, 0.3)",
                    borderRadius: "4px",
                    padding: "8px",
                  }}
                >
                  <p
                    style={{
                      color: "#93c5fd",
                      fontSize: "12px",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Elevation
                  </p>
                  <p
                    style={{
                      color: "white",
                      fontFamily: "monospace",
                      margin: 0,
                    }}
                  >
                    {notification.elevation}
                  </p>
                </div>
                <div
                  style={{
                    background: "rgba(30, 58, 138, 0.3)",
                    borderRadius: "4px",
                    padding: "8px",
                  }}
                >
                  <p
                    style={{
                      color: "#93c5fd",
                      fontSize: "12px",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Distance
                  </p>
                  <p
                    style={{
                      color: "white",
                      fontFamily: "monospace",
                      margin: 0,
                    }}
                  >
                    {notification.distance}
                  </p>
                </div>
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "#93c5fd",
                  marginTop: "8px",
                }}
              >
                {notification.time}
              </div>
            </div>

            {/* Animated border */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "8px",
                border: "1px solid rgba(96, 165, 250, 0.5)",
                pointerEvents: "none",
                animation: "pulse 2s infinite",
              }}
            ></div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
}

export default NotifierSat;
