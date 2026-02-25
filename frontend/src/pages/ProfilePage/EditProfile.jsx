import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../../services/authFetch";
import { useAuth } from "../../context/AuthContext";
import "./EditProfile.scss";

const API_URL = import.meta.env.VITE_API_URL;

export default function EditProfile() {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    displayName: "",
    favoriteArtist: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      const res = await authFetch(`${API_URL}/usuarios/me`);
      if (!res.ok) {
        const text = await res.text();
        console.error("Error response:", text);
        throw new Error("Error en la petición");
      }

      const data = await res.json();

      setFormData({
        nombre: data.nombre ?? "",
        apellidos: data.apellidos ?? "",
        email: data.email ?? "",
        displayName: data.displayName ?? "",
        favoriteArtist: data.favoriteArtist ?? "",
      });
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await authFetch(`${API_URL}/usuarios/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        displayName: formData.displayName,
        favoriteArtist: formData.favoriteArtist,
      }),
    });

    await refreshUser();

    navigate("/profile");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-user">
          <h2>Editar perfil</h2>
        </div>

        <div className="profile-form-card">
          <form onSubmit={handleSubmit}>
            <label>
              Nombre
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </label>

            <label>
              Apellidos
              <input
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
              />
            </label>

            <label>
              Nombre visible
              <input
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                maxLength={16}
              />
              <small>{formData.displayName.length}/16</small>
            </label>
            <label>
              Artista favorito
              <input
                name="favoriteArtist"
                value={formData.favoriteArtist}
                onChange={handleChange}
                maxLength={16}
              />
              <small>{formData.favoriteArtist.length}/16</small>
            </label>
            <label>
              Email
              <input value={formData.email} disabled />
            </label>

            <div className="form-actions">
              <button type="button" onClick={() => navigate("/profile")}>
                Cancelar
              </button>
              <button type="submit">Guardar cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
