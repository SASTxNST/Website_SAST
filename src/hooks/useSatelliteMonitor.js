import { useEffect, useState } from "react";
import Worker from "../workers/predictor.worker.js?worker";
import combinedTLE from "../utils/satellite/combinedTLE";

const DETECTION_RADIUS_KM = 1000;
const NUM_HOURS_TO_PREDICT = 3;
const TIME_STEP_MINUTES = 1;

// Global state that persists across component mounts/unmounts
let globalWorker = null;
let isMonitoring = false;
let userLocation = null;
let notificationCallbacks = new Set();

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
    setTimeout(() => {
      isMonitoring = false;
      startGlobalMonitoring();
    }, 60000); // Restart every minute
  };

  globalWorker.onerror = (error) => {
    console.error("Worker error:", error);
    isMonitoring = false;
    // Retry after 5 seconds
    setTimeout(() => startGlobalMonitoring(), 5000);
  };
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

  useEffect(() => {
    // Request notification permission
    if ("Notification" in window) {
      Notification.requestPermission();
    }

    // Add this component's callback to the global set
    notificationCallbacks.add(setNotification);

    // Get user location and start monitoring if not already started
    if (!userLocation) {
      getUserLocation()
        .then(() => {
          startGlobalMonitoring();
        })
        .catch((error) => {
          console.error("Location error:", error);
        });
    } else {
      startGlobalMonitoring();
    }

    // Cleanup: remove this component's callback but keep worker running
    return () => {
      notificationCallbacks.delete(setNotification);
      // Don't terminate the worker - let it keep running for other components
    };
  }, []);

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
