import { useState, useEffect } from "react";
import Heart from "../../assets/heart.svg";
import Star from "../../assets/star.svg";
import Stats from "../../assets/stats.svg";
import Trash from "../../assets/trash.svg";
import {getFavorites } from "../../services/favoritosApi";

export default function ProfileData() {

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFavorites()
      .then((data) => {
        setFavorites(data);
      })
      .catch((err) => {
        console.error("Error loading favorites", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  return (
    <div className="profileData-container">
      <section className="profileData-activity">
        <div className="profileData-card">
          <img src={Heart} alt="Favorite" className="profileData-svg" />
          <div className="card-text">
            <span className="card-textStats">{favorites.length}</span>
            <span>Favoritos </span>
          </div>
        </div>
        <div className="profileData-card">
          <img src={Star} alt="Puntuaciones" className="profileData-svg" />
          <div className="card-text">
            <span className="card-textStats">0</span>
            <span>Puntuaciones </span>
          </div>
        </div>
        <div className="profileData-card">
          <img src={Stats} alt="Promedio" className="profileData-svg" />
          <div className="card-text">
            <span className="card-textStats">0</span>
            <span>Promedio</span>
          </div>
        </div>
      </section>
      <section>
        <button className="profileData-deleteButton">
          <img src={Trash} alt="Eliminar cuenta" className="profileData-svg" />
          Eliminar cuenta
        </button>
      </section>
    </div>
  );
}
