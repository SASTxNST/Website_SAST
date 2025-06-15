// Fetch TLE group and store in memory (no localStorage cache for large groups)
export async function fetchTLEGroup(group) {
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

      // Do NOT cache in localStorage for large groups
      satellites.push({ id, name, category: group, tle1, tle2 });
    }

    return satellites;
  } catch (err) {
    console.error("Failed to fetch TLE group:", group, err);
    return [];
  }
}
