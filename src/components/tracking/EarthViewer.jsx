import React, { useEffect, useState, useRef, useMemo } from "react";
import { Viewer, Entity, Cesium3DTileset } from "resium";
import { Cartesian3, Color, NearFarScalar } from "cesium";
import * as Cesium from "cesium";
import * as satellite from "satellite.js";
import { fetchTLEGroup } from "./tleFetcher";
import Loader from "../Loader";
import SideBar from "./SideBar";

// --- BUTTONS COMPONENT ---
function OrbitControls({
  selectedSats,
  visibleOrbits,
  toggleOrbit,
  clearOrbits,
  clearSelection,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        zIndex: 10,
        background: "rgba(30,30,30,0.85)",
        borderRadius: 8,
        padding: 12,
        color: "#fff",
        boxShadow: "0 2px 8px #0006",
      }}
    >
      <div style={{ marginBottom: 8, fontWeight: "bold" }}>Orbit Controls</div>
      <button onClick={clearOrbits} style={{ marginRight: 8 }}>
        Hide All Orbits
      </button>
      <button onClick={clearSelection}>Deselect All</button>
      <div style={{ marginTop: 10, fontSize: 13 }}>
        {selectedSats.length === 0 ? (
          "No satellites selected."
        ) : (
          <>
            <div>Selected: {selectedSats.length}</div>
            <div>
              Orbits shown: {visibleOrbits.length}{" "}
              <span style={{ color: "#aaa" }}>(click satellite to toggle)</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Add your Cesium Ion access token here
const CESIUM_ION_TOKEN = import.meta.env.VITE_CESIUM_TOKEN;

function EarthViewer() {
  const [allSatellites, setAllSatellites] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // Start with none selected
  const [selectedSats, setSelectedSats] = useState([]);
  const [positions, setPositions] = useState({});
  const [orbitPaths, setOrbitPaths] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleOrbits, setVisibleOrbits] = useState([]);
  const [pendingOrbits, setPendingOrbits] = useState([]); // <-- New state
  const viewerRef = useRef();

  const CATEGORIES = [
    "active",
    "weather",
    "navigation",
    "starlink",
    "science",
    "specialIntrest",
  ];

  // Load satellites from local files
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
    // Local files, so no need to refresh
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter satellites by category and search
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
      if (prev.includes(id)) {
        setOrbitPaths((prevOrbits) => {
          const newOrbits = { ...prevOrbits };
          delete newOrbits[id];
          return newOrbits;
        });
        setVisibleOrbits((prevVisible) =>
          prevVisible.filter((vid) => vid !== id)
        );
        return prev.filter((sid) => sid !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Toggle orbit visibility for a satellite (robust: only if selected and orbit exists)
  const toggleOrbit = (satId) => {
    console.log(`🔄 toggleOrbit called for satellite ID: ${satId}`);
    console.log("Selected satellites:", selectedSats);
    console.log("Available orbit paths:", Object.keys(orbitPaths));
    console.log("Current visible orbits:", visibleOrbits);

    if (!selectedSats.includes(satId)) {
      console.warn(`❌ Satellite ${satId} not in selected satellites`);
      return;
    }

    if (!orbitPaths[satId]) {
      console.warn(
        `❌ No orbit path for satellite ${satId}. Queuing for display.`
      );
      setPendingOrbits((prev) =>
        prev.includes(satId) ? prev : [...prev, satId]
      );
      return;
    }

    const isCurrentlyVisible = visibleOrbits.includes(satId);
    console.log(`Orbit currently visible: ${isCurrentlyVisible}`);

    setVisibleOrbits((prev) => {
      const newVisible = prev.includes(satId)
        ? prev.filter((id) => id !== satId)
        : [...prev, satId];
      console.log("New visible orbits:", newVisible);
      return newVisible;
    });
  };

  // Effect: When orbitPaths updates, show orbits for any pending satellites
  useEffect(() => {
    if (!pendingOrbits.length) return;
    // Find orbits that are now ready
    const ready = pendingOrbits.filter((satId) => orbitPaths[satId]);
    if (ready.length > 0) {
      setVisibleOrbits((prev) => [
        ...prev,
        ...ready.filter((id) => !prev.includes(id)),
      ]);
      setPendingOrbits((prev) => prev.filter((satId) => !orbitPaths[satId]));
    }
  }, [orbitPaths, pendingOrbits]);

  // Deselect all satellites
  const clearSelection = () => {
    setSelectedSats([]);
    setOrbitPaths({});
    setVisibleOrbits([]);
  };

  // Hide all orbits
  const clearOrbits = () => setVisibleOrbits([]);

  // FIXED ORBIT CALCULATION - Multiple issues corrected
  useEffect(() => {
    const numPoints = 300; // Increased points for smoother orbit
    const totalMinutes = 120; // Longer orbit period for better visualization
    const timeStep = (totalMinutes * 60 * 1000) / numPoints;
    const now = new Date();

    setOrbitPaths((prev) => {
      const newOrbits = { ...prev };
      for (const sat of allSatellites) {
        if (
          selectedSats.includes(sat.id) &&
          !newOrbits[sat.id] &&
          sat.tle1 &&
          sat.tle2
        ) {
          try {
            console.log(`🛰️ Calculating orbit for ${sat.name}:`, { sat });

            // Parse TLE data
            const satrec = satellite.twoline2satrec(sat.tle1, sat.tle2);

            // Check if TLE parsing was successful
            if (satrec.error !== 0) {
              console.error(
                `❌ TLE parsing error for ${sat.name}:`,
                satrec.error
              );
              continue;
            }

            const orbitPoints = [];
            let validPoints = 0;
            let invalidPoints = 0;

            for (let i = -numPoints / 2; i <= numPoints / 2; i++) {
              const time = new Date(now.getTime() + i * timeStep);
              const posVel = satellite.propagate(satrec, time);

              // Check for propagation errors
              if (posVel.error) {
                console.warn(
                  `⚠️ Propagation error at time ${i}:`,
                  posVel.error
                );
                invalidPoints++;
                continue;
              }

              if (!posVel?.position) {
                invalidPoints++;
                continue;
              }

              const gmst = satellite.gstime(time);
              const geo = satellite.eciToGeodetic(posVel.position, gmst);

              const lonDeg = satellite.degreesLong(geo.longitude);
              const latDeg = satellite.degreesLat(geo.latitude);
              const heightKm = geo.height * 10; // Already in kilometers

              // More lenient height validation for different orbit types
              if (heightKm < 100 || heightKm > 50000) {
                console.warn(
                  `⚠️ Extreme height for ${sat.name}: ${heightKm} km at point ${i}. Skipping.`
                );
                invalidPoints++;
                continue;
              }

              // Validate coordinates
              if (isNaN(lonDeg) || isNaN(latDeg) || isNaN(heightKm)) {
                console.warn(
                  `⚠️ Invalid coordinates for ${sat.name} at point ${i}`
                );
                invalidPoints++;
                continue;
              }

              const pos = Cartesian3.fromDegrees(
                lonDeg,
                latDeg,
                heightKm * 1000 // Convert km to meters for Cesium
              );

              if (pos && !isNaN(pos.x) && !isNaN(pos.y) && !isNaN(pos.z)) {
                orbitPoints.push(pos);
                validPoints++;
              } else {
                invalidPoints++;
              }
            }

            console.log(`📊 Orbit calculation results for ${sat.name}:`, {
              validPoints,
              invalidPoints,
              totalRequested: numPoints + 1,
              successRate: `${((validPoints / (numPoints + 1)) * 100).toFixed(
                1
              )}%`,
            });

            if (validPoints > 50) {
              // Lowered threshold
              newOrbits[sat.id] = orbitPoints;
              console.log(
                `✅ Orbit created for ${sat.name} with ${validPoints} points`
              );

              // Log some sample coordinates for debugging
              if (orbitPoints.length > 0) {
                const firstPoint = orbitPoints[0];
                const cartographic =
                  Cesium.Cartographic.fromCartesian(firstPoint);
                console.log(`🌍 First orbit point for ${sat.name}:`, {
                  longitude: Cesium.Math.toDegrees(cartographic.longitude),
                  latitude: Cesium.Math.toDegrees(cartographic.latitude),
                  height: cartographic.height / 1000, // km
                });
              }
            } else {
              console.error(
                `❌ Insufficient valid points for ${sat.name}: ${validPoints}/${
                  numPoints + 1
                }`
              );
            }
          } catch (error) {
            console.error(`❌ Error calculating orbit for ${sat.name}:`, error);
            console.error("TLE data:", { tle1: sat.tle1, tle2: sat.tle2 });
          }
        }
      }

      // Clean up orbits for deselected satellites
      Object.keys(newOrbits).forEach((id) => {
        if (!selectedSats.includes(id)) {
          delete newOrbits[id];
        }
      });

      return newOrbits;
    });

    setVisibleOrbits((prev) => prev.filter((id) => selectedSats.includes(id)));
  }, [selectedSats, allSatellites]);

  // Real-time position updates
  useEffect(() => {
    const updatePositions = () => {
      const now = new Date();
      const updated = {};
      for (const sat of allSatellites) {
        if (!selectedSats.includes(sat.id)) continue;
        if (!sat.tle1 || !sat.tle2) continue;

        try {
          const satrec = satellite.twoline2satrec(sat.tle1, sat.tle2);

          if (satrec.error !== 0) {
            console.warn(`TLE parsing error for ${sat.name}:`, satrec.error);
            continue;
          }

          const gmst = satellite.gstime(now);
          const posVel = satellite.propagate(satrec, now);

          if (posVel.error) {
            console.warn(`Propagation error for ${sat.name}:`, posVel.error);
            continue;
          }

          if (!posVel?.position) continue;

          const geodetic = satellite.eciToGeodetic(posVel.position, gmst);
          const lon = satellite.degreesLong(geodetic.longitude);
          const lat = satellite.degreesLat(geodetic.latitude);
          const height = geodetic.height * 10;

          // Validate coordinates
          if (isNaN(lon) || isNaN(lat) || isNaN(height)) {
            console.warn(`Invalid position for ${sat.name}`);
            continue;
          }

          updated[sat.id] = {
            pos: Cartesian3.fromDegrees(lon, lat, height * 1000),
            name: sat.name,
          };
        } catch (error) {
          console.error(`Error updating position for ${sat.name}:`, error);
        }
      }
      setPositions(updated);
    };

    updatePositions();
    const interval = setInterval(updatePositions, 1000); // Reduced frequency
    return () => clearInterval(interval);
  }, [allSatellites, selectedSats]);

  // Handle click to toggle orbit
  const handleViewerClick = (click) => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;
    const picked = viewer.scene.pick(click.position);
    if (picked && picked.id) {
      const entityId = picked.id.id || picked.id;
      toggleOrbit(entityId);
    }
  };

  // Add toggleCategory for sidebar
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // --- UI ---
  return (
    <>
      {loading && (
        <Loader msg="Loading satellites and orbits. Please wait..." />
      )}
      <OrbitControls
        selectedSats={selectedSats}
        visibleOrbits={visibleOrbits}
        toggleOrbit={toggleOrbit}
        clearOrbits={clearOrbits}
        clearSelection={clearSelection}
      />
      <div style={{ display: "flex", height: "100vh" }}>
        <SideBar
          CATEGORIES={CATEGORIES}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredSatellites={filteredSatellites}
          selectedSats={selectedSats}
          handleSelect={handleSelect}
          visibleOrbits={visibleOrbits}
          toggleOrbit={toggleOrbit}
          orbitPaths={orbitPaths}
        />
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
            cesiumIonAccessToken={CESIUM_ION_TOKEN}
          >
            {/* Add your custom Earth asset as a 3D Tileset */}
            <Cesium3DTileset url={Cesium.IonResource.fromAssetId(3845)} />
            {selectedSats.map(
              (id) =>
                positions[id] && (
                  <React.Fragment key={id}>
                    {/* Satellite marker and label */}
                    <Entity
                      position={positions[id].pos}
                      id={id}
                      point={{
                        pixelSize: 12, // Increased size
                        color: Color.YELLOW,
                        outlineColor: Color.RED,
                        outlineWidth: 2,
                      }}
                      label={{
                        text: positions[id].name,
                        font: "12pt sans-serif",
                        fillColor: Color.WHITE,
                        backgroundColor: Color.BLACK,
                        showBackground: true,
                        verticalOrigin: 1,
                        pixelOffset: new Cartesian3(0, -25, 0),
                        scaleByDistance: new NearFarScalar(
                          1.5e2,
                          1.0,
                          1.5e7,
                          0.2
                        ),
                      }}
                    />

                    {/* Orbit trail with improved visibility */}
                    {(() => {
                      const isInVisibleOrbits = visibleOrbits.includes(id);
                      const hasOrbitPath = !!orbitPaths[id];
                      const orbitPoints = orbitPaths[id];
                      const shouldShowOrbit = isInVisibleOrbits && hasOrbitPath;

                      if (
                        shouldShowOrbit &&
                        orbitPoints &&
                        orbitPoints.length > 0
                      ) {
                        console.log(
                          `🌍 Rendering orbit for ${positions[id].name} with ${orbitPoints.length} points`
                        );

                        return (
                          <Entity
                            key={`orbit-${id}`}
                            name={`${positions[id].name} Orbit`}
                            polyline={{
                              positions: orbitPoints,
                              width: 3,
                              material: Color.CYAN,
                              clampToGround: false,
                              show: true,
                              followSurface: false,
                            }}
                          />
                        );
                      }

                      return null;
                    })()}
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
