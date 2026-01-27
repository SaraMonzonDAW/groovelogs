import { useAuth } from "../../context/AuthContext";
import EditIcon from "../../assets/edit.svg";

export default function ProfileHeader({ onEdit }) {
  const { user } = useAuth();

  return (
    <section className="profile-header">
      <div className="profile-user">
        <div className="profile-avatar">👤</div>

        <div>
          <h2>¡Bienvenido, {user?.email.split("@")[0]}!</h2>
          <p>{user?.email}</p>
        </div>
      </div>

      <button className="edit-profile-btn" onClick={onEdit}>
        <img src={EditIcon} alt="" />
        Editar Perfil
      </button>

    </section>
  );
}