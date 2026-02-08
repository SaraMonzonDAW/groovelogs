import { authFetch } from "./authFetch";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllUsers() {
  const res = await authFetch(`${API_URL}/admin/usuarios`);

  if (!res.ok) throw new Error("Error loading users");

  return res.json();
}

export async function deleteUserById(id) {
  const res = await authFetch(`${API_URL}/admin/usuarios/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error deleting user");
}
