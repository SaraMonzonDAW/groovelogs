const DISCOGS_BASE_URL = 'https://api.discogs.com';

const DISCOGS_TOKEN = import.meta.env.VITE_DISCOGS_TOKEN;

export async function discogsFetch(endpoint, params = {}) {
  const url = new URL(`${DISCOGS_BASE_URL}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Discogs token=${DISCOGS_TOKEN}`,
      'User-Agent': 'MiPWA/1.0',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message || `Discogs error: ${response.status}`
    );
  }

  return response.json();
}
