import { useAuth } from "../../context/AuthContext";
import EditIcon from "../../assets/edit.svg";
import "./Profile.style.scss";

export default function ProfileHeader({ onEdit }) {
  const { user } = useAuth();

  return (
    <section className="profile-header">
      <div className="profile-user">
        <div>
          <h2>¡Bienvenido, {user?.displayName}!</h2>
        </div>
        <div>
          <button className="edit-profile-btn" onClick={onEdit}>
            <img src={EditIcon} alt="" />
            Editar Perfil
          </button>
        </div>
      </div>
    </section>
  );
}
