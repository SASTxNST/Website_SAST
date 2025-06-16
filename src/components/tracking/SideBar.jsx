import React from "react";

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
  orbitPaths, // <-- Accept orbitPaths as a prop
}) => {
  return (
    <div
      style={{
        width: 300,
        height: "100vh",
        overflowY: "auto",
        background: "#111",
        color: "white",
        padding: 10,
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000,
      }}
    >
      <h3 style={{ marginBottom: 8 }}>Categories</h3>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => toggleCategory(cat)}
          style={{
            width: "100%",
            marginBottom: 6,
            padding: "6px 10px",
            background: selectedCategories.includes(cat) ? "#2b3d55" : "#222",
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
              background: selectedSats.includes(sat.id) ? "#223a5f" : "#222",
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
    </div>
  );
};

export default SideBar;
