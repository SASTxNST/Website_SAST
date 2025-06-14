// Fetches astronomy/space news from the Spaceflight News API
// Returns an array of normalized news items: { id, title, summary, url, image }

const API_URL = "https://api.spaceflightnewsapi.net/v4/articles/";

export async function fetchAstronomyNews({ limit = 12, offset = 0 } = {}) {
  try {
    const url = `${API_URL}?limit=${limit}&offset=${offset}&ordering=-published_at`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const data = await res.json();
    // Normalize articles
    const news = data.results.map((item) => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      url: item.url,
      image: item.image_url || item.launches?.[0]?.image_url || "",
      publishedAt: item.published_at,
      source: item.news_site,
    }));
    return { news, total: data.count };
  } catch (error) {
    return { news: [], total: 0, error: error.message };
  }
}
