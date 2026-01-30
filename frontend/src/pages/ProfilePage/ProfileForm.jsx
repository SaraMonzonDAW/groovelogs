import { useEffect, useState } from "react";
import { authFetch } from "../../services/authFetch";
import "./Profile.style.scss";

export default function ProfileForm({ onClose }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    bio: "",
    displayName: "",
    favoriteArtist: "",
    avatarUrl: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      const res = await authFetch("http://localhost:8080/api/usuarios/me");
      const data = await res.json();

      setFormData({
        nombre: data.nombre ?? "",
        apellidos: data.apellidos ?? "",
        email: data.email ?? "",
        displayName: data.displayName ?? "",
        favoriteArtist: data.favoriteArtist ?? "",
        avatarUrl: data.avatarUrl ?? "",
      });
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await authFetch("http://localhost:8080/api/usuarios/me", {
      method: "PUT",
      body: JSON.stringify({
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        displayName: formData.displayName,
        favoriteArtist: formData.favoriteArtist,
        avatarUrl: formData.avatarUrl,
      }),
    });

    onClose();
  };

  return (
    <div className="profile-form-overlay">
      <div className="profile-form-card">
        <h3>Editar perfil</h3>

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
            />
          </label>

          <label>
            Artista favorito
            <input
              name="favoriteArtist"
              value={formData.favoriteArtist}
              onChange={handleChange}
            />
          </label>
          <label>
            Email
            <input name="email" value={formData.email} disabled />
          </label>
          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
