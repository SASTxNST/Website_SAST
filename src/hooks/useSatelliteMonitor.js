import { useEffect, useState } from "react";
import Worker from "../workers/predictor.worker.js?worker";
import useSettings from "../hooks/UseSettings";
import combinedTLE from "../utils/satellite/combinedTLE";

const DETECTION_RADIUS_KM = 1000;
const NUM_HOURS_TO_PREDICT = 3;
const TIME_STEP_MINUTES = 1;

// Global state that persists across component mounts/unmounts
let globalWorker = null;
let isMonitoring = false;
let userLocation = null;
let notificationCallbacks = new Set();
let restartTimer = null;

const startGlobalMonitoring = () => {
  if (isMonitoring || !userLocation) return;

  isMonitoring = true;

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

  const satArray = Array.from(allParsedSats.values()).slice(0, 5000);

  globalWorker = new Worker();

  globalWorker.postMessage({
    satellites: satArray,
    userLocation,
    radiusKm: DETECTION_RADIUS_KM,
    numHours: NUM_HOURS_TO_PREDICT,
    timeStepMinutes: TIME_STEP_MINUTES,
    useLocation: true,
  });

  globalWorker.onmessage = (e) => {
    if (e.data.length > 0) {
      const pass = {
        ...e.data[0],
        time: new Date().toLocaleString(),
      };

      // Notify all active components
      notificationCallbacks.forEach((callback) => {
        callback(pass);
      });

      // Browser notification
      if (Notification.permission === "granted") {
        new Notification(`🛰️ ${pass.satelliteName} is passing overhead!`, {
          icon: "🛰️",
          body: `Elevation: ${pass.elevation}, Distance: ${pass.distance}`,
        });
      }
    }

    // Restart monitoring after completion
    restartTimer = setTimeout(() => {
      isMonitoring = false;
      startGlobalMonitoring();
    }, 60000);
  };

  globalWorker.onerror = (error) => {
    console.error("Worker error:", error);
    isMonitoring = false;
    // Retry after 5 seconds
    restartTimer = setTimeout(() => startGlobalMonitoring(), 5000);
  };
};

const stopGlobalMonitoring = () => {
  // Clear any scheduled restarts
  if (restartTimer) {
    clearTimeout(restartTimer);
    restartTimer = null;
  }

  if (globalWorker) {
    try {
      globalWorker.postMessage({ type: "stop" });
    } catch (e) {
      // ignore
    }
    try {
      globalWorker.terminate();
    } catch (e) {}
    globalWorker = null;
  }
  isMonitoring = false;
};

const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (userLocation) {
      resolve(userLocation);
      return;
    }

    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude || 0,
        };
        resolve(userLocation);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const useSatelliteMonitor = () => {
  const [notification, setNotification] = useState(null);
  const { settings, setSetting } = useSettings();
  const useLocationEnabled =
    settings.find((s) => s.id === "useLocation")?.enabled ?? true;

  useEffect(() => {
    // Request notification permission
    if ("Notification" in window) {
      Notification.requestPermission();
    }

    notificationCallbacks.add(setNotification);

    // Get user location and start monitoring if not already started
    if (!useLocationEnabled) {
      stopGlobalMonitoring();
      return;
    }

    if (!userLocation) {
      getUserLocation()
        .then(() => {
          // user allowed — ensure useLocation setting reflects that
          try {
            setSetting("useLocation", true);
          } catch (e) {}
          startGlobalMonitoring();
        })
        .catch((error) => {
          console.error("Location error:", error);
          if (error && error.code === 1) {
            try {
              setSetting("useLocation", false);
            } catch (e) {}
          }
        });
    } else {
      startGlobalMonitoring();
    }

    // If Permissions API is available, listen for changes to geolocation permission
    let permStatus = null;
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((status) => {
          permStatus = status;
          const handler = () => {
            if (status.state === "granted") {
              try {
                setSetting("useLocation", true);
              } catch (e) {}

              getUserLocation()
                .then(() => startGlobalMonitoring())
                .catch(() => {});
            } else if (status.state === "denied") {
              try {
                setSetting("useLocation", false);
              } catch (e) {}
              stopGlobalMonitoring();
            }
          };
          status.addEventListener("change", handler);
        })
        .catch(() => {});
    }

    // Cleanup: remove this component's callback but keep worker running
    return () => {
      notificationCallbacks.delete(setNotification);

      try {
        if (permStatus && permStatus.removeEventListener) {
          permStatus.removeEventListener("change", () => {});
        }
      } catch (e) {}
    };
  }, []);

  // Watch for useLocation setting changes and stop/start monitoring accordingly
  useEffect(() => {
    if (!useLocationEnabled) {
      stopGlobalMonitoring();
    } else {
      if (!userLocation) {
        getUserLocation()
          .then(() => startGlobalMonitoring())
          .catch((err) => console.error("Location error:", err));
      } else {
        startGlobalMonitoring();
      }
    }
     
  }, [useLocationEnabled]);

  const clearNotification = () => {
    setNotification(null);
  };

  return {
    notification,
    clearNotification,
    isMonitoring: () => isMonitoring,
    userLocation: () => userLocation,
  };
};
