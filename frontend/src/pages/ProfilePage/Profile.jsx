import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import "./Profile.style.scss";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="profile-page">
      <ProfileHeader onEdit={() => setIsEditing(true)} />

      {isEditing && (
        <ProfileForm
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}