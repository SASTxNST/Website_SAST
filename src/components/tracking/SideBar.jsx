import React, { useState } from "react";
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
        background: "#111",
        color: "white",
        padding: 10,
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000,
        transition: "width 0.2s",
      }}
    >
      <button
        onClick={() => setCollapsed((c) => !c)}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        style={{
          ...btnStyle,
          position: "absolute",
          left: collapsed ? 2 : 270,
          top: 10,
          zIndex: 1100,
          background: "#222",
          width: 28,
          height: 28,
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
      {!collapsed && (
        <>
          {/* Top control buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: "12px 16px 0 0",
              gap: 8,
            }}
          >
            <button onClick={onHome} title="Reset Camera" style={btnStyle}>
              <Home size={22} />
            </button>
            <button
              onClick={onToggleAllOrbits}
              title={orbitsVisible ? "Hide All Orbits" : "Show All Orbits"}
              style={btnStyle}
            >
              {orbitsVisible ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
            <button onClick={onSelectAll} title="Select All" style={btnStyle}>
              <CheckSquare size={22} />
            </button>
            <button
              onClick={onDeselectAll}
              title="Deselect All"
              style={btnStyle}
            >
              <MinusSquare size={22} />
            </button>
            <button
              onClick={onReset}
              title="Reset (Remove all entities)"
              style={btnStyle}
            >
              <RotateCcw size={22} />
            </button>
            <button
              onClick={onFullscreenToggle}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              style={btnStyle}
            >
              {isFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
            </button>
          </div>

          <h3 style={{ marginBottom: 8 }}>Categories</h3>
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
                  : "#222",
                color: "#fff",
                border: "1px solid #333",
                borderRadius: 6,
                textAlign: "left",
              }}
            >
              {cat}
            </button>
          ))}

          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              marginTop: 12,
              marginBottom: 8,
              padding: 6,
              borderRadius: 4,
              border: "none",
            }}
          />

          {filteredSatellites.length === 0 && (
            <div style={{ color: "#aaa", fontSize: 13, marginTop: 10 }}>
              No satellites match your filters.
            </div>
          )}

          {filteredSatellites.map((sat) => (
            <div key={sat.id} style={{ marginBottom: 6 }}>
              <button
                onClick={() => handleSelect(sat.id)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "6px 10px",
                  borderRadius: 6,
                  border: selectedSats.includes(sat.id)
                    ? "2px solid #4af"
                    : "1px solid #333",
                  background: selectedSats.includes(sat.id)
                    ? "#223a5f"
                    : "#222",
                  color: "#fff",
                  cursor: "pointer",
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
                  disabled={!orbitPaths[sat.id]} // <-- Disable if orbit not ready
                  style={{
                    width: "100%",
                    marginTop: 2,
                    padding: "4px 10px",
                    borderRadius: 4,
                    border: "1px solid #555",
                    background: visibleOrbits.includes(sat.id)
                      ? "#2d5a2d"
                      : !orbitPaths[sat.id]
                      ? "#444"
                      : "#333",
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

const btnStyle = {
  background: "#222",
  border: "none",
  borderRadius: 6,
  padding: 8,
  cursor: "pointer",
  color: "#fff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  display: "flex",
  alignItems: "center",
};

export default SideBar;
