import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ProfileHeader.scss";

export default function ProfileHeader({ onEdit }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.displayName || user?.nombre || "usuario";

  return (
    <section className="profile-header">
      <div className="profile-header-info">
        <h2>¡Bienvenido, {displayName}!</h2>
        <p className="profile-email">{user?.email}</p>
        {user?.favoriteArtist && (
          <p className="profile-favorite">
            Artista favorito: <span>{user.favoriteArtist}</span>
          </p>
        )}
      </div>
      <button
        className="edit-profile-btn"
        onClick={() => navigate("/profile/edit")}
      >
        Editar perfil
      </button>
    </section>
  );
}
