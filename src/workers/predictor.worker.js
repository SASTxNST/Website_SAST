import * as satellite from "satellite.js";

// Allow cancellation / stop commands
let cancelled = false;

self.onmessage = function (e) {
  // Support a simple stop command
  if (e.data && e.data.type === "stop") {
    cancelled = true;
    return;
  }

  // Reset cancelled state for new work
  cancelled = false;

  // Support messages that either send payload directly or with a { type: 'start', payload } envelope
  const payload = e.data && e.data.type === "start" ? e.data.payload : e.data;

  const start = Date.now();
  // If location usage is disabled or userLocation is missing, do nothing
  if (payload && payload.useLocation === false) {
    // Send an empty result so UI can handle it
    self.postMessage([]);
    return;
  }

  const { satellites, userLocation, radiusKm, numHours, timeStepMinutes } =
    payload;
  const passes = [];

  if (!userLocation) {
    // Nothing to compute without a location
    self.postMessage([]);
    return;
  }

  const userGd = {
    longitude: satellite.degreesToRadians(userLocation.longitude),
    latitude: satellite.degreesToRadians(userLocation.latitude),
    height: userLocation.altitude / 1000,
  };

  const userEcf = satellite.geodeticToEcf(userGd);
  const now = new Date();
  const steps = (numHours * 60) / timeStepMinutes;

  for (let s = 0; s < satellites.length; s++) {
    if (cancelled) {
      self.postMessage({ type: "cancelled" });
      return;
    }

    const sat = satellites[s];
    let satrec;
    try {
      satrec = satellite.twoline2satrec(sat.line1, sat.line2);
    } catch {
      continue;
    }

    for (let i = 0; i < steps; i++) {
      if (cancelled) {
        self.postMessage({ type: "cancelled" });
        return;
      }

      const time = new Date(now.getTime() + i * timeStepMinutes * 60000);
      const pos = satellite.propagate(satrec, time);
      if (!pos || !pos.position) continue;

      const gmst = satellite.gstime(time);
      const ecf = satellite.eciToEcf(pos.position, gmst);

      const distance = Math.sqrt(
        Math.pow(userEcf.x - ecf.x, 2) +
        Math.pow(userEcf.y - ecf.y, 2) +
        Math.pow(userEcf.z - ecf.z, 2)
      );

      if (distance <= radiusKm) {
        const look = satellite.ecfToLookAngles(userGd, ecf);
        if (look.elevation > 0) {
          passes.push({
            satelliteName: sat.name,
            time: time.toLocaleString(),
            distance: `${distance.toFixed(2)} km`,
            elevation: `${satellite
              .radiansToDegrees(look.elevation)
              .toFixed(2)}°`,
          });
          break; // only first valid pass
        }
      }
    }
  }

  if (!cancelled) {
    self.postMessage(passes);
  } else {
    self.postMessage({ type: "cancelled" });
  }
};
