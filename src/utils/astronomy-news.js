// Fetches astronomy/space news from the Spaceflight News API
// Returns an array of normalized news items: { id, title, summary, url, image }

const API_URL = "https://api.spaceflightnewsapi.net/v4/articles/";
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Custom error class for API-specific errors
class AstronomyAPIError extends Error {
  constructor(message, status, type) {
    super(message);
    this.name = 'AstronomyAPIError';
    this.status = status;
    this.type = type;
  }
}

// Helper function to delay execution
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to categorize errors
const categorizeError = (error, status) => {
  if (!navigator.onLine) return new AstronomyAPIError('No internet connection', status, 'NETWORK');
  if (status === 429) return new AstronomyAPIError('Rate limit exceeded', status, 'RATE_LIMIT');
  if (status >= 500) return new AstronomyAPIError('Server error', status, 'SERVER');
  if (status === 404) return new AstronomyAPIError('Resource not found', status, 'NOT_FOUND');
  if (status >= 400) return new AstronomyAPIError('Invalid request', status, 'CLIENT');
  return new AstronomyAPIError('Unknown error occurred', status, 'UNKNOWN');
};

export async function fetchAstronomyNews({ limit = 12, offset = 0 } = {}) {
  let lastError;
  
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      if (attempt > 0) {
        await delay(RETRY_DELAY * attempt); // Exponential backoff
      }

      const url = `${API_URL}?limit=${limit}&offset=${offset}&ordering=-published_at`;
      const res = await fetch(url);
      
      if (!res.ok) {
        throw categorizeError(null, res.status);
      }

      const data = await res.json();
      
      // Validate response data
      if (!data.results || !Array.isArray(data.results)) {
        throw new AstronomyAPIError('Invalid API response format', null, 'INVALID_RESPONSE');
      }

      // Normalize articles
      const news = data.results.map((item) => ({
        id: item.id,
        title: item.title || 'Untitled',
        summary: item.summary || 'No summary available',
        url: item.url,
        image: item.image_url || item.launches?.[0]?.image_url || "",
        publishedAt: item.published_at,
        source: item.news_site || 'Unknown Source',
      }));

      return { 
        news, 
        total: data.count,
        status: 'success',
        attempt: attempt + 1
      };

    } catch (error) {
      lastError = error;
      
      // Don't retry if it's a client error (except rate limiting)
      if (error.type && ['CLIENT', 'NOT_FOUND'].includes(error.type) && error.status !== 429) {
        break;
      }
    }
  }

  return { 
    news: [], 
    total: 0, 
    error: {
      message: lastError.message,
      type: lastError.type || 'UNKNOWN',
      status: lastError.status,
      attempts: MAX_RETRIES
    }
  };
}
