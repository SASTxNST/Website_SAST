/* eslint-disable no-self-assign */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
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
const HEIGHT_EXAGGERATION_FACTOR = 10;

// --- MAIN COMPONENT ---
const EarthViewer = ({ loading, setLoading }) => {
  // State
  const [objectCategories, setObjectCategories] = useState([]);
  const [allSatellites, setAllSatellites] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSats, setSelectedSats] = useState([]);
  const [visibleOrbits, setVisibleOrbits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [orbitsVisible, setOrbitsVisible] = useState(true);
  const [hoveredSatId, setHoveredSatId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const viewerRef = useRef();

  // --- Filter satellites by selected categories and search ---
  const filteredSatellites = useMemo(() => {
    return allSatellites.filter(
      (sat) =>
        selectedCategories.includes(sat.category) &&
        sat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allSatellites, selectedCategories, searchTerm]);

  // --- Prepare Cesium helpers ---
  const helperFunctions = useMemo(
    () => ({
      SampledPositionProperty: Cesium.SampledPositionProperty,
      JulianDate: Cesium.JulianDate,
      Cartesian3: Cesium.Cartesian3,
    }),
    []
  );

  // Function to create exaggerated position property
  const createExaggeratedPosition = useCallback((originalPosition) => {
    if (!originalPosition || !originalPosition._property)
      return originalPosition;

    const times = originalPosition._property._times || [];
    const exaggeratedPosition = new Cesium.SampledPositionProperty();

    for (let i = 0; i < times.length; i++) {
      const time = times[i];
      const originalPos = new Cartesian3();
      originalPosition.getValue(time, originalPos);

      // Convert to cartographic to get lat/lon/height
      const carto = Cesium.Cartographic.fromCartesian(originalPos);
      if (carto) {
        // Exaggerate the height
        const exaggeratedHeight = carto.height * HEIGHT_EXAGGERATION_FACTOR;

        // Convert back to Cartesian3 with exaggerated height
        const exaggeratedPos = Cesium.Cartesian3.fromRadians(
          carto.longitude,
          carto.latitude,
          exaggeratedHeight
        );

        exaggeratedPosition.addSample(time, exaggeratedPos);
      }
    }

    return exaggeratedPosition;
  }, []);

  // Memoize all event handlers to prevent unnecessary rerenders in children
  const handleFullscreenToggle = useCallback(() => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
    setIsFullscreen((prev) => !prev);
  }, [isFullscreen]);

  const handleReset = useCallback(() => {
    setSelectedSats([]);
    setVisibleOrbits([]);
    setSelectedCategories([]);
    setSearchTerm("");
  }, []);

  // Prompt for user geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (err) => {
          setUserLocation(null);
        }
      );
    }
  }, []);

  // If userLocation is set, fly camera there immediately
  useEffect(() => {
    if (!userLocation) return;
    const viewer = viewerRef.current?.cesiumElement;
    if (viewer && userLocation.lat && userLocation.lon) {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          userLocation.lon,
          userLocation.lat,
          20000000 // 2,000km above ground
        ),
        duration: 2,
      });
    }
  }, [userLocation]);

  // Home/Reset Camera handler
  const handleHome = useCallback(() => {
    const camera = viewerRef.current?.cesiumElement?.camera;
    if (camera) {
      if (userLocation && userLocation.lat && userLocation.lon) {
        camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(
            userLocation.lon,
            userLocation.lat,
            20000000
          ),
          duration: 1.5,
        });
      } else {
        camera.flyHome(1.0);
      }
    }
  }, [userLocation]);

  // Toggle all orbits handler
  const handleToggleAllOrbits = useCallback(() => {
    if (orbitsVisible) {
      setVisibleOrbits([]);
    } else {
      setVisibleOrbits([...selectedSats]);
    }
    setOrbitsVisible(!orbitsVisible);
  }, [orbitsVisible, selectedSats]);

  // Select all handler
  const handleSelectAll = useCallback(() => {
    setSelectedSats(filteredSatellites.map((sat) => sat.id));
  }, [filteredSatellites]);

  // Deselect all handler
  const handleDeselectAll = useCallback(() => {
    setSelectedSats([]);
    setVisibleOrbits([]);
  }, []);

  // --- On mount: propagate all satellites and categories ---
  useEffect(() => {
    if (setLoading) setLoading(true);
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

      // Flatten all satellites for easy access and apply height exaggeration
      const allSats = [];
      propagatedCategories.forEach((cat) => {
        cat.data.forEach((sat, i) => {
          allSats.push({
            ...sat,
            id: `${cat.name}-${sat.satnum}-${i}`,
            category: cat.name,
            color: cat.color,
            position: createExaggeratedPosition(sat.position),
          });
        });
      });

      setObjectCategories(initialObjectCategories);
      setAllSatellites(allSats);
      setSelectedCategories([]);
      if (setLoading) setLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [setLoading, helperFunctions, createExaggeratedPosition]);

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
        positions.push(Cartesian3.clone(pos));
      }
      if (positions.length > 1) positions.push(Cartesian3.clone(positions[0]));
      result[id] = positions;
    }
    return result;
  }, [allSatellites, selectedSats]);

  // --- Category selection logic ---
  const toggleCategory = useCallback((cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }, []);

  // --- Satellite selection logic ---
  const handleSelect = useCallback((satId) => {
    setSelectedSats((prev) =>
      prev.includes(satId)
        ? prev.filter((id) => id !== satId)
        : [...prev, satId]
    );
    setVisibleOrbits((prev) => prev.filter((id) => id !== satId));
  }, []);

  // --- Orbit toggle logic ---
  const toggleOrbit = useCallback((satId) => {
    setVisibleOrbits((prev) =>
      prev.includes(satId)
        ? prev.filter((id) => id !== satId)
        : [...prev, satId]
    );
  }, []);

  // Imagery provider state
  const [imageryProvider, setImageryProvider] = useState(null);

  useEffect(() => {
    Cesium.Ion.defaultAccessToken = Cesium.Ion.defaultAccessToken;
    Cesium.IonImageryProvider.fromAssetId(3845).then((provider) => {
      setImageryProvider(provider);
    });
  }, []);

  // --- Set Cesium clock to first sample time of selected satellite ---
  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer || allSatellites.length === 0 || selectedSats.length === 0)
      return;

    let maxStart = null;
    let minEnd = null;

    for (const id of selectedSats) {
      const sat = allSatellites.find((s) => s.id === id);
      const times = sat?.position?._property?._times;
      if (!times || times.length === 0) continue;

      const start = times[0];
      const end = times[times.length - 1];

      if (!maxStart || Cesium.JulianDate.greaterThan(start, maxStart)) {
        maxStart = start;
      }
      if (!minEnd || Cesium.JulianDate.lessThan(end, minEnd)) {
        minEnd = end;
      }
    }

    if (
      !maxStart ||
      !minEnd ||
      Cesium.JulianDate.greaterThan(maxStart, minEnd)
    ) {
      console.warn(
        "No overlapping sample time range across selected satellites."
      );
      return;
    }

    viewer.clock.currentTime = maxStart.clone();
    viewer.clock.shouldAnimate = true;
    viewer.clock.multiplier = 1;
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
    viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;
  }, [allSatellites, selectedSats]);

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
          orbitPaths={memoizedOrbitPaths}
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
            onMount={(viewer) => {
              // Disable default double-click zoom
              if (viewer && viewer.screenSpaceEventHandler) {
                viewer.screenSpaceEventHandler.removeInputAction(
                  Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
                );
              }
            }}
          >
            {/* Use lower-lag imagery layer */}
            {imageryProvider && (
              <ImageryLayer imageryProvider={imageryProvider} />
            )}
            {/* Satellite visualizations as spheres with labels */}
            {selectedSats.map((id) => {
              const sat = allSatellites.find((s) => s.id === id);
              if (!sat || !sat.position) {
                return null;
              }
              if (typeof sat.position.getValue !== "function") {
                return null;
              }

              return (
                <Entity
                  key={id}
                  name={sat.name}
                  position={sat.position}
                  ellipsoid={{
                    radii: new Cesium.Cartesian3(100000, 100000, 100000),
                    material: sat.color || Cesium.Color.CYAN,
                    outline: false,
                    clampToGround: false,
                  }}
                  label={{
                    text: sat.name || `Satellite ${id}`,
                    font: "16px Arial, sans-serif",
                    fillColor: Cesium.Color.WHITE,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 2,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    showBackground: true,
                    backgroundColor: Cesium.Color.BLACK.withAlpha(0.8),
                    backgroundPadding: new Cesium.Cartesian2(8, 4),
                    pixelOffset: new Cesium.Cartesian2(0, -50),
                    scale: 1.2,
                    show: true,
                    distanceDisplayCondition:
                      new Cesium.DistanceDisplayCondition(0, 2e7),
                    disableDepthTestDistance: Number.POSITIVE_INFINITY,
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                  }}
                />
              );
            })}
            {/* Orbit polylines */}
            {visibleOrbits.map((id) => {
              const sat = allSatellites.find((s) => s.id === id);
              if (!sat || !memoizedOrbitPaths[id]) return null;
              return (
                <Entity
                  key={`orbit-${id}`}
                  polyline={{
                    positions: memoizedOrbitPaths[id],
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
