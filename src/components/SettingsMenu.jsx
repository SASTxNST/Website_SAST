import React, { useState, useEffect, useRef } from "react";
import { useSettings } from "../hooks/UseSettings";
import { Cog } from "lucide-react";
const SettingsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, toggleSetting, isLoading, setSetting } = useSettings();
  const [geoPerm, setGeoPerm] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((status) => {
          if (!mounted) return;
          setGeoPerm(status.state);
          status.addEventListener("change", () => setGeoPerm(status.state));
        })
        .catch(() => {
          if (!mounted) return;
          setGeoPerm(null);
        });
    } else {
      setGeoPerm(null);
    }
    return () => {
      mounted = false;
    };
  }, []);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  if (isLoading) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 rounded-full
          bg-black hover:bg-[#111111]
          border border-[#C4C4C4]
          flex items-center justify-center
          shadow-xl hover:shadow-2xl
          transition-all duration-300 ease-out
          ${isOpen ? "rotate-90" : ""}
        `}
        aria-label="Settings"
      >
        <Cog />
      </button>
      {/* Settings Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="
            absolute bottom-20 right-10
            w-80 min-h-fit max-w-[calc(100vw-4rem)]
            bg-black border border-[#C4C4C4]
            rounded-2xl shadow-2xl
            overflow-hidden
            animate-in slide-in-from-bottom-4 fade-in duration-300
          "
        >
          {/* Header Section */}
          <div className="p-8 pb-6 border-b-2 bg-black border-slate-500">
            <h2 className="text-xl font-bold text-white mb-2">Settings</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Customize your experience
            </p>
          </div>

          {/* Settings Options */}
          <div className="p-6 space-y-6">
            {settings.map((setting, index) => (
              <div
                key={setting.id}
                className="flex items-center justify-between gap-8"
              >
                {/* Setting Label */}
                <div className="flex-1 flex items-center">
                  <h3 className="text-white font-medium text-base">
                    {setting.label}
                  </h3>
                </div>

                {/* Simple Toggle Switch */}
                <div className="flex-shrink-0">
                  <button
                    onClick={async () => {
                      // Special handling for useLocation: require permission to turn on
                      if (setting.id === "useLocation") {
                        if (setting.enabled) {
                          setSetting("useLocation", false);
                          return;
                        }

                        // If permission is denied, prevent turning on and notify
                        if (geoPerm === "denied") {
                          window.showToast?.(
                            "Location permission denied. Enable it in browser settings.",
                            "error"
                          );
                          setSetting("useLocation", false);
                          return;
                        }

                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (pos) => {
                              setSetting("useLocation", true);
                            },
                            (err) => {
                              window.showToast?.(
                                "Location permission denied.",
                                "error"
                              );
                              setSetting("useLocation", false);
                            }
                          );
                          return;
                        }

                        // Fallback: just toggle
                        setSetting("useLocation", true);
                        return;
                      }

                      // Default: toggle other settings
                      toggleSetting(setting.id);
                    }}
                    className={`
                      relative w-14 h-8 rounded-full
                      transition-colors duration-300 ease-out
                      focus:outline-none focus:ring-4 focus:ring-blue-500/30
                      ${
                        setting.enabled
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-slate-600 hover:bg-slate-500"
                      }
                      ${
                        setting.id === "useLocation" && geoPerm === "denied"
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }
                    `}
                    aria-label={`Toggle ${setting.label}`}
                  >
                    {/* Toggle Indicator */}
                    <div
                      className={`
                        absolute top-1 w-6 h-6 bg-white rounded-full
                        shadow-lg transition-transform duration-300 ease-out
                        ${setting.enabled ? "translate-x-7" : "translate-x-1"}
                      `}
                    />
                  </button>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;
