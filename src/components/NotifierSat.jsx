import React, { useEffect, useState } from "react";
import Worker from "../workers/predictor.worker.js?worker";
import combinedTLE from "../utils/satellite/combinedTLE";
import { Satellite } from "lucide-react";

const DETECTION_RADIUS_KM = 1000;
const NUM_HOURS_TO_PREDICT = 24;
const TIME_STEP_MINUTES = 1;

function NotifierSat() {
  const [userLocation, setUserLocation] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude || 0,
        });
      },
      (err) => {
        console.error("Location error:", err);
      }
    );
  }, []);

  const showNotification = (pass) => {
    setNotification(pass);
    setIsVisible(true);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setNotification(null), 300); // Wait for slide-out animation
    }, 5000);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setNotification(null), 300);
  };

  useEffect(() => {
    if (!userLocation) return;

    const parseTleArrays = (rawTleArray) => {
      const sats = [];
      for (let i = 0; i < rawTleArray.length; i += 3) {
        if (i + 2 < rawTleArray.length) {
          sats.push({
            name: rawTleArray[i],
            line1: rawTleArray[i + 1],
            line2: rawTleArray[i + 2],
          });
        }
      }
      return sats;
    };

    const allParsedSats = combinedTLE
      .flatMap((group) => parseTleArrays(group.data))
      .reduce((acc, sat) => {
        if (!acc.has(sat.line1)) acc.set(sat.line1, sat);
        return acc;
      }, new Map());

    const satArray = Array.from(allParsedSats.values());

    const worker = new Worker();

    worker.postMessage({
      satellites: satArray,
      userLocation,
      radiusKm: DETECTION_RADIUS_KM,
      numHours: NUM_HOURS_TO_PREDICT,
      timeStepMinutes: TIME_STEP_MINUTES,
    });

    worker.onmessage = (e) => {
      if (e.data.length > 0) {
        const pass = e.data[0];
        // Update the time to current time when notification is triggered
        const updatedPass = {
          ...pass,
          time: new Date().toLocaleString(),
        };
        showNotification(updatedPass);

        if (Notification.permission === "granted") {
          new Notification(`🛰️ ${pass.satelliteName} is passing overhead!`, {
            icon: "🛰️",
            body: `Elevation: ${pass.elevation}, Distance: ${pass.distance}`,
          });
        }
      }
      worker.terminate();
    };

    return () => worker.terminate();
  }, [userLocation]);

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

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
}

export default NotifierSat;
