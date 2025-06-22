import * as satellite from "satellite.js";

self.onmessage = function (e) {
  const start = Date.now();
  console.log(start);
  const { satellites, userLocation, radiusKm, numHours, timeStepMinutes } =
    e.data;
  const passes = [];
  const userGd = {
    longitude: satellite.degreesToRadians(userLocation.longitude),
    latitude: satellite.degreesToRadians(userLocation.latitude),
    height: userLocation.altitude / 1000,
  };
  const userEcf = satellite.geodeticToEcf(userGd);
  const now = new Date();
  const steps = (numHours * 60) / timeStepMinutes;

  satellites.forEach((sat) => {
    let satrec;
    try {
      satrec = satellite.twoline2satrec(sat.line1, sat.line2);
    } catch {
      return;
    }

    for (let i = 0; i < steps; i++) {
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
  });
  self.postMessage(passes);
};
