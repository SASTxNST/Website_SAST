import React, { useEffect, useState, useMemo, useRef } from "react";
import { Viewer, Entity, ImageryLayer } from "resium";
import { Color, Cartesian3 } from "cesium";
import propagateObjects from "../../utils/satellite/propagateObjects";
import SideBar from "./SideBar";
import combinedTLE from "../../utils/satellite/combinedTLE";
import * as Cesium from "cesium";
import {
  enterFullscreen,
  exitFullscreen,
} from "../../utils/satellite/screenUtils";
// --- CONFIG ---
const interpolationDegree = 7;

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [orbitsVisible, setOrbitsVisible] = useState(true);
  // Add a state to force re-render for animation
  const [tick, setTick] = useState(0);
  const viewerRef = useRef();
  const handleFullscreenToggle = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
    setIsFullscreen((prev) => !prev);
  };
  // --- Prepare Cesium helpers ---
  const helperFunctions = useMemo(
    () => ({
      SampledPositionProperty: Cesium.SampledPositionProperty,
      JulianDate: Cesium.JulianDate,
      Cartesian3: Cesium.Cartesian3,
    }),
    []
  );

  // Reset handler: remove all entities from the screen
  const handleReset = () => {
    setSelectedSats([]);
    setVisibleOrbits([]);
    setOrbitPaths({});
    setSelectedCategories([]);
    setSearchTerm("");
  };

  // Home/Reset Camera handler
  const handleHome = () => {
    const camera = viewerRef.current?.cesiumElement?.camera;
    if (camera) {
      camera.flyHome(1.0);
    }
  };

  // Toggle all orbits handler
  const handleToggleAllOrbits = () => {
    if (orbitsVisible) {
      setVisibleOrbits([]);
    } else {
      setVisibleOrbits([...selectedSats]);
    }
    setOrbitsVisible(!orbitsVisible);
  };

  // Select all handler
  const handleSelectAll = () => {
    setSelectedSats(filteredSatellites.map((sat) => sat.id));
  };

  // Deselect all handler
  const handleDeselectAll = () => {
    setSelectedSats([]);
    setVisibleOrbits([]);
  };

  // --- On mount: propagate all satellites and categories ---
  useEffect(() => {
    if (setLoading) setLoading(true); // Show loader immediately
    const timer = setTimeout(() => {
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
    }, 0);
    return () => clearTimeout(timer);
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

  // Memoize orbit paths for smooth animation and no flicker, even for single satellites
  const memoizedOrbitPaths = useMemo(() => {
    const result = {};
    for (const id of selectedSats) {
      const sat = allSatellites.find((s) => s.id === id);
      if (!sat || !sat.position) continue;
      const times = sat.position._property?._times || [];
      const positions = [];
      for (let i = 0; i < times.length; i++) {
        const pos = new Cartesian3();
        sat.position.getValue(times[i], pos);
        if (i === 0) {
          const carto = Cesium.Ellipsoid.WGS84.cartesianToCartographic(pos);
          const height = carto ? carto.height : null;
          console.log(`ORBIT: ${sat.name} JD: ${times[0]}, height (meters):`, height, pos);
        }
        positions.push(Cartesian3.clone(pos));
      }
      if (positions.length > 1) positions.push(Cartesian3.clone(positions[0]));
      result[id] = positions;
    }
    return result;
  }, [allSatellites, selectedSats]);

  // Memoize satellite positions for perfect sync with orbit (first time sample)
  const satellitePositions = useMemo(() => {
    const result = {};
    for (const id of selectedSats) {
      const sat = allSatellites.find((s) => s.id === id);
      if (!sat) continue;
      // Use the first time sample for perfect sync with orbit
      const times = sat.position?._property?._times;
      let posRaw = null;
      let jd = null;
      if (times && times.length > 0) {
        posRaw = sat.position.getValue(times[0]);
        jd = times[0];
      }
      if (posRaw) {
        const carto = Cesium.Ellipsoid.WGS84.cartesianToCartographic(posRaw);
        const height = carto ? carto.height : null;
        console.log(`SATELLITE: ${sat.name} JD: ${jd}, height (meters):`, height, posRaw);
        result[id] = posRaw;
      }
    }
    return result;
  }, [allSatellites, selectedSats, tick]);

  // Imagery provider state
  const [imageryProvider, setImageryProvider] = useState(null);

  useEffect(() => {
    Cesium.Ion.defaultAccessToken = Cesium.Ion.defaultAccessToken;
    Cesium.IonImageryProvider.fromAssetId(3845).then((provider) => {
      setImageryProvider(provider);
    });
  }, []);

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
          isFullscreen={isFullscreen}
          onFullscreenToggle={handleFullscreenToggle}
          onReset={handleReset}
          onHome={handleHome}
          onToggleAllOrbits={handleToggleAllOrbits}
          orbitsVisible={orbitsVisible}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
        />
        <div style={{ flex: 1, height: "100vh" }}>
          <Viewer
            ref={viewerRef}
            full
            sceneMode={3}
            baseLayerPicker={false}
            timeline={false}
            animation={false}
            navigationHelpButton={false}
            infoBox={false}
            selectionIndicator={false}
          >
            {/* Use lower-lag imagery layer */}
            {imageryProvider && (
              <ImageryLayer imageryProvider={imageryProvider} />
            )}
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
            {visibleOrbits.map((id) => {
              const sat = allSatellites.find((s) => s.id === id);
              if (!sat || !orbitPaths[id]) return null;
              return (
                <Entity
                  key={`orbit-${id}`}
                  polyline={{
                    positions: orbitPaths[id],
                    width: 2,
                    material: sat.color || Cesium.Color.YELLOW.withAlpha(0.7),
                    clampToGround: false,
                  }}
                />
              );
            })}
          </Viewer>
        </div>
      </div>
    </>
  );
};

export default EarthViewer;
