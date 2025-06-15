// Utility to get and set cache in localStorage
function getTLECache() {
  try {
    return JSON.parse(localStorage.getItem("tleCache") || "{}") || {};
  } catch {
    return {};
  }
}

function setTLECache(cache) {
  localStorage.setItem("tleCache", JSON.stringify(cache));
}

// Fetch TLE group and store in memory (no localStorage cache for large groups)
export async function fetchTLEGroup(group) {
  let cache = getTLECache();
  const now = Date.now();
  const groupCache = cache[group] || { lastFetched: 0, count: 0, data: [] };
  const lastFetchedDay = new Date(groupCache.lastFetched).toDateString();
  const today = new Date(now).toDateString();

  // Reset count if new day
  if (lastFetchedDay !== today) {
    groupCache.count = 0;
  }

  if (groupCache.count >= 2 && lastFetchedDay === today) {
    // Strict: only fetch twice per day
    return groupCache.data || [];
  }

  try {
    const res = await fetch(
      `https://celestrak.org/NORAD/elements/gp.php?GROUP=${group}&FORMAT=tle`
    );
    const text = await res.text();

    const lines = text.split("\n").filter(Boolean);
    const satellites = [];

    for (let i = 0; i < lines.length; i += 3) {
      const name = lines[i]?.trim();
      const tle1 = lines[i + 1]?.trim();
      const tle2 = lines[i + 2]?.trim();

      // Defensive check
      if (!tle1 || !tle2 || tle1.split(" ").length < 2) continue;

      const id = tle1.split(/\s+/)[1]; // NORAD ID
      if (!id) continue;

      satellites.push({ id, name, category: group, tle1, tle2 });
    }
    // Save to cache
    groupCache.lastFetched = now;
    groupCache.count = (groupCache.count || 0) + 1;
    groupCache.data = satellites;
    cache[group] = groupCache;
    setTLECache(cache);
    return satellites;
  } catch (err) {
    console.error("Failed to fetch TLE group:", group, err);
    return groupCache.data || [];
  }
}
