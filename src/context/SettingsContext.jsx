import React, { createContext, useContext, useState, useEffect } from "react";

// Define available settings with their default values
const defaultSettings = [
  { id: "notifications", label: "Notifications", enabled: true },
  { id: "pointerAnimations", label: "Pointer Animations", enabled: true },
  { id: "autoPlay", label: "Auto Play Videos", enabled: true },
  { id: "useLocation", label: "Use location", enabled: true },
  { id: "smoothScroll", label: "Smooth Scroll", enabled: true },
];

const SettingsContext = createContext();

// IndexedDB utilities
const DB_NAME = "SASWebsiteSettings";
const DB_VERSION = 1;
const STORE_NAME = "settings";

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
};

const saveSettingsToIndexedDB = async (settings) => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    // Save each setting
    for (const setting of settings) {
      store.put(setting);
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  } catch (error) {
    console.error("Error saving settings to IndexedDB:", error);
  }
};

const loadSettingsFromIndexedDB = async () => {
  try {
    const db = await openDB();
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const savedSettings = request.result;
        if (savedSettings.length === 0) {
          // No saved settings, return defaults
          resolve(defaultSettings);
        } else {
          // Merge saved settings with defaults (in case new settings were added)
          const mergedSettings = defaultSettings.map((defaultSetting) => {
            const savedSetting = savedSettings.find(
              (s) => s.id === defaultSetting.id
            );
            return savedSetting || defaultSetting;
          });
          resolve(mergedSettings);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error loading settings from IndexedDB:", error);
    return defaultSettings;
  }
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from IndexedDB on mount
  useEffect(() => {
    const loadSettings = async () => {
      const loadedSettings = await loadSettingsFromIndexedDB();
      setSettings(loadedSettings);
      setIsLoading(false);
    };

    loadSettings();
  }, []);

  // Save settings to IndexedDB whenever settings change
  useEffect(() => {
    if (!isLoading) {
      saveSettingsToIndexedDB(settings);
    }
  }, [settings, isLoading]);

  const toggleSetting = (settingId) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === settingId
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const setSetting = (settingId, enabled) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === settingId ? { ...setting, enabled } : setting
      )
    );
  };

  const getSetting = (settingId) => {
    const setting = settings.find((s) => s.id === settingId);
    return setting ? setting.enabled : false;
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const value = {
    settings,
    toggleSetting,
    setSetting,
    getSetting,
    resetSettings,
    isLoading,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsProvider"
    );
  }
  return context;
};

export default SettingsContext;
