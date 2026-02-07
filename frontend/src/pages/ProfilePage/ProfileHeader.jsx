import { useAuth } from "../../context/AuthContext";
import EditIcon from "../../assets/edit.svg";
import { useNavigate } from "react-router-dom";
import "./ProfileHeader.scss";

export default function ProfileHeader({ onEdit }) {
  const { user } = useAuth();
  const navigate = useNavigate();

return (
  <section className="profile-header">
    <div className="profile-header-info">
      <h2>¡Bienvenido, {user?.displayName}!</h2>
      <p className="profile-email">{user?.email}</p>
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
