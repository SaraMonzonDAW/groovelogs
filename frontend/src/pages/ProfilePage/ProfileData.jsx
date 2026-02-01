import { useState, useEffect } from "react";
import Heart from "../../assets/heart.svg";
import Star from "../../assets/star.svg";
import Stats from "../../assets/stats.svg";
import Trash from "../../assets/trash.svg";
import { getFavorites } from "../../services/favoritosApi";
import { getTotalRatings, getMyRatings } from "../../services/ratingApi";
import "./ProfileData.scss";

export default function ProfileData() {
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);
  const [selectedSection, setSelectedSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getFavorites(), getTotalRatings(), getMyRatings()])
      .then(([favoritesData, ratingsCountData, ratingsData]) => {
        setFavorites(favoritesData);
        setTotalRatings(ratingsCountData);
        setRatings(ratingsData);
      })
      .catch((err) => {
        console.error("Error loading profile data", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCardClick = (section) => {
    setSelectedSection(selectedSection === section ? null : section);
  };

  return (
    <div className="profileData-container">
      <section className="profileData-activity">
        <button
          className="profileData-card profileData-card-btn"
          onClick={() => handleCardClick("favorites")}
        >
          <img src={Heart} alt="Favorite" className="profileData-svg" />
          <div className="card-text">
            <span className="card-textStats">{favorites.length}</span>
            <span>Favoritos </span>
          </div>
          <span className="card-arrow">→</span>
        </button>
        <button
          className="profileData-card profileData-card-btn"
          onClick={() => handleCardClick("ratings")}
        >
          <img src={Star} alt="Puntuaciones" className="profileData-svg" />
          <div className="card-text">
            <span className="card-textStats">{totalRatings}</span>
            <span>Puntuaciones </span>
          </div>
          <span className="card-arrow">→</span>
        </button>
      </section>

      {selectedSection === "favorites" && (
        <section className="profile-section">
          <h3>❤️ Mis Favoritos ({favorites.length})</h3>
          <div className="profile-list">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="profile-list-item">
                <div className="profile-list-info">
                  <h4>{favorite.titulo}</h4>
                  <p className="profile-list-type">
                    {favorite.tipo} • {favorite.artista}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedSection === "ratings" && (
        <section className="profile-section">
          <h3>⭐ Mis Puntuaciones ({ratings.length})</h3>
          <div className="profile-list">
            {ratings.map((rating) => (
              <div key={rating.id} className="profile-list-item">
                <div className="profile-list-info">
                  <h4>{rating.titulo}</h4>
                  <p className="profile-list-type">
                    {rating.tipo} • {rating.artista}
                  </p>
                </div>
                <div className="profile-list-rating">
                  {"⭐".repeat(rating.puntuacion)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="profile-danger">
        <div className="profile-danger-title">Zona de Peligro</div>
        <button className="profileData-deleteButton">
          <img src={Trash} alt="Eliminar cuenta" className="profileData-svg" />
          Eliminar Cuenta
        </button>
      </section>
    </div>
  );
}
