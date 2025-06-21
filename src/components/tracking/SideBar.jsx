import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Maximize,
  Minimize,
  RotateCcw,
  Home,
  Eye,
  EyeOff,
  CheckSquare,
  MinusSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const SideBar = ({
  CATEGORIES,
  selectedCategories,
  toggleCategory,
  searchTerm,
  setSearchTerm,
  filteredSatellites,
  selectedSats,
  handleSelect,
  visibleOrbits,
  toggleOrbit,
  orbitPaths,
  isFullscreen,
  onFullscreenToggle,
  onReset,
  onHome,
  onToggleAllOrbits,
  orbitsVisible,
  onSelectAll,
  onDeselectAll,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      style={{
        width: collapsed ? 40 : 300,
        height: "100vh",
        overflowY: "auto",
        background: "rgba(20, 20, 30, 0.95)",
        color: "white",
        padding: 10,
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000,
        transition: "width 0.3s ease",
        fontFamily: "'Orbitron', sans-serif",
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Collapse / Expand Button */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        style={{
          position: "absolute",
          left: collapsed ? 4 : 270,
          top: 12,
          background: "#1a1a2f",
          width: 26,
          height: 26,
          borderRadius: 6,
          border: "none",
          color: "#8ab4f8",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {!collapsed && (
        <>
          {/* Control Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "8px",
              marginTop: 40,
              marginBottom: 20,
            }}
          >
            <SidebarButton icon={<Home size={20} />} onClick={onHome} title="Home" />
            <SidebarButton icon={orbitsVisible ? <EyeOff size={20} /> : <Eye size={20} />} onClick={onToggleAllOrbits} title="Toggle Orbits" />
            <SidebarButton icon={<CheckSquare size={20} />} onClick={onSelectAll} title="Select All" />
            <SidebarButton icon={<MinusSquare size={20} />} onClick={onDeselectAll} title="Deselect All" />
            <SidebarButton icon={<RotateCcw size={20} />} onClick={onReset} title="Reset" />
            <SidebarButton icon={isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />} onClick={onFullscreenToggle} title="Fullscreen" />
          </div>

          {/* Return to Home Page Button */}
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                background: "#1a1a2f",
                color: "#8ab4f8",
                border: "1px solid #2e3b4e",
                borderRadius: 6,
                textDecoration: "none",
                fontSize: "14px",
                transition: "background 0.3s",
              }}
            >
              <Home size={18} />
              Return to Home
            </Link>
          </div>

          {/* Category Filter */}
          <h1 style={{ fontSize: "16px", marginBottom: 6 }}>Categories</h1>
          <div style={{ marginBottom: 16 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                style={{
                  width: "100%",
                  marginBottom: 6,
                  padding: "6px 10px",
                  background: selectedCategories.includes(cat)
                    ? "#2b3d55"
                    : "#1a1a2f",
                  color: "#fff",
                  border: "1px solid #2e3b4e",
                  borderRadius: 6,
                  textAlign: "left",
                  transition: "background 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search satellites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #2e3b4e",
              background: "#101822",
              color: "#fff",
              marginBottom: 12,
            }}
          />

          {/* Satellite List */}
          {filteredSatellites.length === 0 && (
            <div style={{ color: "#aaa", fontSize: 13 }}>
              No satellites match your filters.
            </div>
          )}

          {filteredSatellites.map((sat) => (
            <div key={sat.id} style={{ marginBottom: 8 }}>
              <button
                onClick={() => handleSelect(sat.id)}
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: selectedSats.includes(sat.id)
                    ? "2px solid #4af"
                    : "1px solid #2e3b4e",
                  background: selectedSats.includes(sat.id)
                    ? "#223a5f"
                    : "#1a1a2f",
                  color: "#fff",
                  textAlign: "left",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {sat.name}
              </button>
              {selectedSats.includes(sat.id) && (
                <button
                  onClick={() => toggleOrbit(sat.id)}
                  disabled={!orbitPaths[sat.id]}
                  style={{
                    width: "100%",
                    marginTop: 3,
                    padding: "4px 8px",
                    borderRadius: 4,
                    border: "1px solid #333",
                    background: visibleOrbits.includes(sat.id)
                      ? "#2d5a2d"
                      : !orbitPaths[sat.id]
                      ? "#444"
                      : "#252d3a",
                    color: "#fff",
                    cursor: orbitPaths[sat.id] ? "pointer" : "not-allowed",
                    fontSize: "11px",
                    opacity: orbitPaths[sat.id] ? 1 : 0.6,
                  }}
                >
                  {visibleOrbits.includes(sat.id) ? "Hide Orbit" : "Show Orbit"}
                </button>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

// Button component for top icon buttons
const SidebarButton = ({ icon, onClick, title }) => (
  <button
    onClick={onClick}
    title={title}
    style={{
      background: "#1a1a2f",
      border: "1px solid #2e3b4e",
      borderRadius: 6,
      padding: 6,
      color: "#8ab4f8",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background 0.2s",
    }}
  >
    {icon}
  </button>
);

export default SideBar;
