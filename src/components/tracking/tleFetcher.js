import activeTLE from "../../data/full-catalog.js";
import weatherTLE from "../../data/weather-earth.js";
import navigationTLE from "../../data/navigation.js";
import starlinkTLE from "../../data/starlink.js";
import scienceTLE from "../../data/scientific.js";
import specialIntrestTLE from "../../data/special-interest.js";

const TLE_DATA = {
  active: activeTLE,
  weather: weatherTLE,
  navigation: navigationTLE,
  starlink: starlinkTLE,
  science: scienceTLE,
  specialIntrest: specialIntrestTLE,
};

// Utility to parse TLE array into satellite objects
function parseTLEArray(tleArray, category) {
  const satellites = [];
  for (let i = 0; i < tleArray.length; i += 3) {
    const name = tleArray[i]?.trim();
    const tle1 = tleArray[i + 1]?.trim();
    const tle2 = tleArray[i + 2]?.trim();
    if (!tle1 || !tle2 || tle1.split(" ").length < 2) continue;
    const id = tle1.split(/\s+/)[1];
    if (!id) continue;
    satellites.push({ id, name, category, tle1, tle2 });
  }
  return satellites;
}

// Fetch TLE group from local file
export async function fetchTLEGroup(group) {
  const tleArray = TLE_DATA[group];
  if (!tleArray) return [];
  return parseTLEArray(tleArray, group);
}
