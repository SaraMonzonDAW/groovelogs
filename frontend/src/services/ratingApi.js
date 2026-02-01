import { authFetch } from "./authFetch";

const API_URL = "http://localhost:8080/api/ratings";

export async function rateItem(rating) {
  const res = await authFetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rating),
  });

  if (!res.ok) throw new Error("Error rating");
  return res.json();
}

export async function getAverage(discogsId, tipo) {
  const res = await authFetch(
    `${API_URL}/media?discogsId=${discogsId}&tipo=${tipo}`
  );

  if (!res.ok) throw new Error("Error loading average");
  return res.json(); 
}

export async function getMyRating(discogsId, tipo) {
  const res = await authFetch(
    `${API_URL}/me?discogsId=${discogsId}&tipo=${tipo}`
  );

  if (!res.ok) throw new Error("Error loading rating");
  return res.json(); 
}

export async function getTotalRatings() {
  const res = await authFetch(`${API_URL}/me/count`);

  if (!res.ok) throw new Error("Error loading total ratings");
  return res.json();
}

export async function getMyRatings() {
  const res = await authFetch(`${API_URL}/me/all`);
  if (!res.ok) throw new Error("Error loading ratings");
  return res.json();
}

