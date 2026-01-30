import { useState } from "react";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import ProfileData from "./ProfileData";
import Arrow from "../../assets/arrow-left.svg";
import "./Profile.style.scss";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="profile-page">
      <Link to="/" className="profilePage-link"> <img src={Arrow} alt="Back" className="profileData-svg" /> Volver a inicio</Link>
      <div className="profile-container">
            <ProfileHeader onEdit={() => setIsEditing(true)} />
            <ProfileData></ProfileData>
      </div>
      {isEditing && (
        <ProfileForm
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}