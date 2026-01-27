import { useEffect, useState } from "react";
import { authFetch } from "../../services/authFetch";

export default function ProfileForm({ onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
    surname: "",
    bio: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      const res = await authFetch("http://localhost:8080/api/users/me");
      const data = await res.json();
      setFormData(data);
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

    await authFetch("http://localhost:8080/api/users/me", {
      method: "PUT",
      body: JSON.stringify(formData),
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
            <input name="name" value={formData.name} onChange={handleChange} />
          </label>

          <label>
            Apellidos
            <input
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />
          </label>

          <label>
            Nombre de usuario
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>

          <label>
            Email
            <input name="email" value={formData.email} disabled />
          </label>

          <label>
            Bio
            <textarea name="bio" value={formData.bio} onChange={handleChange} />
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