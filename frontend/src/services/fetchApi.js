export async function discogsFetch(endpoint, params = {}) {
  const BASE = import.meta.env.VITE_API_URL;

  const url = new URL(`${BASE}/discogs${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }

  return response.json();
}
