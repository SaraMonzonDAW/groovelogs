import { authFetch } from "./authFetch";

const API_URL = "http://localhost:8080/api/favoritos";

export async function getFavorites() {
  const res = await authFetch(API_URL);

  if (!res.ok) {
    throw new Error("Error loading favorites");
  }

  return res.json();
}

export async function addFavorite(favorito) {
  const res = await authFetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(favorito),
  });

  if (!res.ok) {
    throw new Error("Error adding favorite");
  }

  return res.json();
}

export async function removeFavorite(discogsId, tipo) {
  const url = `${API_URL}?discogsId=${discogsId}&tipo=${tipo}`;

  const res = await authFetch(url, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error removing favorite");
  }
}
