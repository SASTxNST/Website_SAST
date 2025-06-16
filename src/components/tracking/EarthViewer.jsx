import React, { useEffect, useState, useRef, useMemo } from "react";
import { Viewer, Entity } from "resium";
import {
  Cartesian3,
  Color,
  NearFarScalar,
  JulianDate,
  SampledPositionProperty,
} from "cesium";
import * as satellite from "satellite.js";
import { fetchTLEGroup } from "./tleFetcher";
import Loader from "../Loader";

const CATEGORIES = [
  "active",
  "weather",
  "visual",
  "starlink",
  "science",
  "geodetic",
  "military",
];

function EarthViewer() {
  const [allSatellites, setAllSatellites] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSats, setSelectedSats] = useState([]);
  const [positions, setPositions] = useState({});
  const [orbitPaths, setOrbitPaths] = useState({}); // Static orbit paths calculated once
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleOrbits, setVisibleOrbits] = useState([]);
  const viewerRef = useRef();

  // Fetch TLEs on load and update regularly
  useEffect(() => {
    let isMounted = true;
    const loadAll = async () => {
      setLoading(true);
      let combined = [];
      for (const category of CATEGORIES) {
        const sats = await fetchTLEGroup(category);
        combined = [...combined, ...sats];
      }
      const seen = new Set();
      const uniqueSats = combined.filter((sat) => {
        if (seen.has(sat.id)) return false;
        seen.add(sat.id);
        return true;
      });
      if (isMounted) {
        setAllSatellites(uniqueSats);
        setLoading(false);
      }
    };
    loadAll();
    // Refresh TLEs every 10 minutes
    const interval = setInterval(loadAll, 10 * 60 * 1000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Filtered by selected categories and search
  const filteredSatellites = useMemo(() => {
    return allSatellites.filter(
      (sat) =>
        selectedCategories.includes(sat.category) &&
        sat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allSatellites, selectedCategories, searchTerm]);

  // Select/deselect a satellite
  const handleSelect = (id) => {
    setSelectedSats((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((sid) => sid !== id)
        : [...prev, id];

      // Clean up orbit paths for deselected satellites
      if (prev.includes(id)) {
        setOrbitPaths((prevOrbits) => {
          const newOrbits = { ...prevOrbits };
          delete newOrbits[id];
          return newOrbits;
        });
        setVisibleOrbits((prevVisible) =>
          prevVisible.filter((vid) => vid !== id)
        );
      }

      return newSelection;
    });
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prevCats) => {
      const isSelected = prevCats.includes(cat);
      return isSelected
        ? prevCats.filter((c) => c !== cat)
        : [...prevCats, cat];
    });
  };

  // Toggle orbit visibility for a specific satellite
  const toggleOrbit = (satId) => {
    setVisibleOrbits((prev) =>
      prev.includes(satId)
        ? prev.filter((id) => id !== satId)
        : [...prev, satId]
    );
  };

  // Calculate full circular orbits once when satellites are selected
  useEffect(() => {
    const calculateFullOrbits = () => {
      const orbits = {};

      const numPoints = 300;
      const totalMinutes = 90; // typical orbital period
      const timeStep = (totalMinutes * 60 * 1000) / numPoints;

      const now = new Date();

      for (const sat of allSatellites) {
        if (!selectedSats.includes(sat.id)) continue;
        if (!sat.tle1 || !sat.tle2 || orbitPaths[sat.id]) continue;

        const satrec = satellite.twoline2satrec(sat.tle1, sat.tle2);
        const orbitPoints = [];

        for (let i = -numPoints / 2; i <= numPoints / 2; i++) {
          const time = new Date(now.getTime() + i * timeStep);
          const posVel = satellite.propagate(satrec, time);
          if (!posVel?.position) continue;

          const gmst = satellite.gstime(time);
          const geo = satellite.eciToGeodetic(posVel.position, gmst);
          const pos = Cartesian3.fromDegrees(
            satellite.degreesLong(geo.longitude),
            satellite.degreesLat(geo.latitude),
            geo.height * 1000
          );
          orbitPoints.push(pos);
        }

        orbits[sat.id] = orbitPoints;
      }

      if (Object.keys(orbits).length > 0) {
        setOrbitPaths((prev) => ({ ...prev, ...orbits }));
      }
    };

    calculateFullOrbits();
  }, [allSatellites, selectedSats]);

  // Compute live positions only (frequent updates)
  useEffect(() => {
    const updatePositions = () => {
      const now = new Date();
      const updated = {};

      for (const sat of allSatellites) {
        if (!selectedSats.includes(sat.id)) continue;
        if (!sat.tle1 || !sat.tle2) continue;

        const satrec = satellite.twoline2satrec(sat.tle1, sat.tle2);
        const gmst = satellite.gstime(now);
        const posVel = satellite.propagate(satrec, now);
        if (!posVel?.position) continue;

        const geodetic = satellite.eciToGeodetic(posVel.position, gmst);
        const lon = satellite.degreesLong(geodetic.longitude);
        const lat = satellite.degreesLat(geodetic.latitude);
        const height = geodetic.height * 1000;

        updated[sat.id] = {
          pos: Cartesian3.fromDegrees(lon, lat, height),
          name: sat.name,
        };
      }

      setPositions(updated);
    };

    updatePositions();
    const interval = setInterval(updatePositions, 5000);
    return () => clearInterval(interval);
  }, [allSatellites, selectedSats]);

  // Handler for picking satellite dots
  const handleViewerClick = (click) => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;

    const picked = viewer.scene.pick(click.position);
    if (picked && picked.id) {
      // The entity ID should match the satellite ID
      const entityId = picked.id.id || picked.id;
      console.log("Clicked entity ID:", entityId); // Debug log

      // Toggle orbit visibility for this satellite
      toggleOrbit(entityId);
    }
  };

  return (
    <>
      {loading && (
        <Loader msg="Loading satellites and orbits. Please wait until all are ready..." />
      )}
      <div style={{ display: "flex", height: "100vh" }}>
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
                  style={{
                    width: "100%",
                    marginTop: 2,
                    padding: "4px 10px",
                    borderRadius: 4,
                    border: "1px solid #555",
                    background: visibleOrbits.includes(sat.id)
                      ? "#2d5a2d"
                      : "#333",
                    color: "#fff",
                    cursor: "pointer",
                    fontSize: "11px",
                  }}
                >
                  {visibleOrbits.includes(sat.id) ? "Hide Orbit" : "Show Orbit"}
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ flex: 1, marginLeft: 300 }}>
          <Viewer
            ref={viewerRef}
            full
            timeline={false}
            animation={false}
            navigationHelpButton={false}
            homeButton={false}
            fullscreenButton={false}
            geocoder={false}
            sceneModePicker={false}
            baseLayerPicker={false}
            selectionIndicator={false}
            infoBox={false}
            vrButton={false}
            navigationInstructionsInitiallyVisible={false}
            onClick={handleViewerClick}
          >
            {selectedSats.map(
              (id) =>
                positions[id] && (
                  <React.Fragment key={id}>
                    {/* Satellite marker and label at current position */}
                    <Entity
                      position={positions[id].pos}
                      id={id}
                      point={{
                        pixelSize: 8,
                        color: Color.YELLOW,
                        outlineColor: Color.RED,
                        outlineWidth: 1,
                      }}
                      label={{
                        text: positions[id].name,
                        font: "10pt sans-serif",
                        fillColor: Color.WHITE,
                        backgroundColor: Color.BLACK,
                        showBackground: true,
                        verticalOrigin: 1,
                        pixelOffset: new Cartesian3(0, -20, 0),
                        scaleByDistance: new NearFarScalar(
                          1.5e2,
                          1.0,
                          1.5e7,
                          0.2
                        ),
                      }}
                    />
                    {/* Orbit trail as a polyline */}
                    {visibleOrbits.includes(id) && orbitPaths[id] && (
                      <Entity
                        polyline={{
                          positions: orbitPaths[id],
                          width: 2,
                          material: Color.CYAN.withAlpha(0.8),
                          clampToGround: false,
                        }}
                      />
                    )}
                  </React.Fragment>
                )
            )}
          </Viewer>
        </div>
      </div>
    </>
  );
}

export default EarthViewer;
