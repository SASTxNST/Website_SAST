import React, { useEffect, useState, useMemo } from "react";
import { Viewer, Entity } from "resium";
import { Color, Cartesian3 } from "cesium";
import propagateObjects from "../../utils/satellite/propagateObjects";
import SideBar from "./SideBar";
import combinedTLE from "../../utils/satellite/combinedTLE";
import * as Cesium from "cesium";
// --- CONFIG ---
const interpolationDegree = 7;
const pointPixelSize = 2;

// --- MAIN COMPONENT ---
const EarthViewer = ({ loading, setLoading }) => {
  // State
  const [objectCategories, setObjectCategories] = useState([]);
  const [allSatellites, setAllSatellites] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSats, setSelectedSats] = useState([]);
  const [orbitPaths, setOrbitPaths] = useState({});
  const [visibleOrbits, setVisibleOrbits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Add a state to force re-render for animation
  const [tick, setTick] = useState(0);

  // --- Prepare Cesium helpers ---
  const helperFunctions = useMemo(
    () => ({
      SampledPositionProperty: Cesium.SampledPositionProperty,
      JulianDate: Cesium.JulianDate,
      Cartesian3: Cesium.Cartesian3,
    }),
    []
  );

  // --- On mount: propagate all satellites and categories ---
  useEffect(() => {
    const startDate = new Date();
    const hiddenByDefault = ["Other", "Debris"];
    const { propagatedCategories, initialObjectCategories } = (() => {
      let seenSats = [];
      const propagatedCategories = [];
      const initialObjectCategories = [];
      combinedTLE.forEach((category) => {
        const { newSeen, data } = propagateObjects(
          seenSats,
          category.data,
          startDate,
          interpolationDegree,
          helperFunctions
        );
        seenSats = newSeen;
        if (data.length > 0) {
          const extraData = {
            name: category.name,
            color: category.color,
            visible: !hiddenByDefault.includes(category.name),
          };
          initialObjectCategories.push({
            objectsCount: data.length,
            ...extraData,
          });
          propagatedCategories.push({
            data,
            ...extraData,
          });
        }
      });
      return { propagatedCategories, initialObjectCategories };
    })();

    // Flatten all satellites for easy access
    const allSats = [];
    propagatedCategories.forEach((cat) => {
      cat.data.forEach((sat, i) => {
        allSats.push({
          ...sat,
          id: `${cat.name}-${sat.satnum}-${i}`,
          category: cat.name,
          color: cat.color,
        });
      });
    });

    setObjectCategories(initialObjectCategories);
    setAllSatellites(allSats);
    setSelectedCategories(
      initialObjectCategories.filter((c) => c.visible).map((c) => c.name)
    );
    if (setLoading) setLoading(false); // Data is ready, stop loading
  }, [setLoading, helperFunctions]);

  // --- Filter satellites by selected categories and search ---
  const filteredSatellites = useMemo(() => {
    return allSatellites.filter(
      (sat) =>
        selectedCategories.includes(sat.category) &&
        sat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allSatellites, selectedCategories, searchTerm]);

  // --- Orbit path calculation for selected satellites ---
  useEffect(() => {
    // Only calculate for selected satellites
    const newOrbits = {};
    for (const sat of allSatellites) {
      if (selectedSats.includes(sat.id) && sat.position) {
        // Extract all positions from SampledPositionProperty
        const times = sat.position._property?._times || [];
        const positions = [];
        for (let i = 0; i < times.length; i++) {
          const pos = new Cartesian3();
          sat.position.getValue(times[i], pos);
          positions.push(Cartesian3.clone(pos));
        }
        // Close the orbit
        if (positions.length > 1)
          positions.push(Cartesian3.clone(positions[0]));
        newOrbits[sat.id] = positions;
      }
    }
    setOrbitPaths(newOrbits);
  }, [selectedSats, allSatellites]);

  // --- Category selection logic ---
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // --- Satellite selection logic ---
  const handleSelect = (satId) => {
    setSelectedSats((prev) =>
      prev.includes(satId)
        ? prev.filter((id) => id !== satId)
        : [...prev, satId]
    );
    setVisibleOrbits((prev) => prev.filter((id) => id !== satId)); // Hide orbit if deselected
  };

  // --- Orbit toggle logic ---
  const toggleOrbit = (satId) => {
    setVisibleOrbits((prev) =>
      prev.includes(satId)
        ? prev.filter((id) => id !== satId)
        : [...prev, satId]
    );
  };

  // Animate satellites by updating tick every second
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Memoize satellite positions for smooth animation and no flicker
  const satellitePositions = useMemo(() => {
    const now = Cesium.JulianDate.now();
    const result = {};
    for (const id of selectedSats) {
      const sat = allSatellites.find((s) => s.id === id);
      if (!sat) continue;
      const posRaw = sat.position.getValue(now);
      if (posRaw) {
        // Add a small height offset (e.g., +50km)
        result[id] = new Cesium.Cartesian3(
          posRaw.x,
          posRaw.y,
          posRaw.z + 50000
        );
      }
    }
    return result;
  }, [allSatellites, selectedSats, tick]);

  // --- Render ---
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar
          CATEGORIES={objectCategories.map((c) => c.name)}
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
        <div style={{ flex: 1, height: "100vh" }}>
          <Viewer
            full
            sceneMode={3}
            baseLayerPicker={false}
            timeline={false}
            animation={false}
            navigationHelpButton={false}
            infoBox={false}
            selectionIndicator={false}
          >
            {/* Satellite visualizations as spheres */}
            {selectedSats.map((id) => {
              const pos = satellitePositions[id];
              const sat = allSatellites.find((s) => s.id === id);
              if (!sat || !pos) return null;
              return (
                <Entity
                  key={id}
                  name={sat.name}
                  position={pos}
                  ellipsoid={{
                    radii: new Cesium.Cartesian3(100000, 100000, 100000),
                    material: sat.color || Cesium.Color.CYAN,
                    outline: false,
                  }}
                />
              );
            })}
            {/* Orbit polylines */}
            {visibleOrbits.map((id) =>
              orbitPaths[id] ? (
                <Entity
                  key={`orbit-${id}`}
                  polyline={{
                    positions: orbitPaths[id],
                    width: 2,
                    material: Cesium.Color.YELLOW.withAlpha(0.7),
                    clampToGround: false,
                  }}
                />
              ) : null
            )}
          </Viewer>
        </div>
      </div>
    </>
  );
};

export default EarthViewer;
