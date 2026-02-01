import { useState, useEffect } from "react";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../../services/favoritosApi";
import { getAverage, rateItem, getMyRating } from "../../services/ratingApi";
import Heart from "../../assets/heart.svg";
import "./AlbumCard.style.scss";
import { useAuth } from "../../context/AuthContext";

export default function AlbumCard({ item, searchTrack, onRequireAuth }) {
  const { isAuthenticated } = useAuth();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [average, setAverage] = useState(0);

  const [artist, releaseTitle] = item.title.includes(" - ")
    ? item.title.split(" - ")
    : ["", item.title];

  const title = searchTrack ?? releaseTitle;

  useEffect(() => {
    if (!isAuthenticated) return;

    getFavorites().then((favorites) => {
      const exists = favorites.some(
        (f) => f.discogsId === item.id && f.tipo === "album",
      );
      setIsFavorite(exists);
    });
  }, [isAuthenticated, item.id]);

  useEffect(() => {
    getAverage(item.id, "album")
      .then((data) => setAverage(data.media))
      .catch(() => setAverage(0));
  }, [item.id]);

  function handleRate(value) {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }

    setRating(value);

    rateItem({
      discogsId: item.id,
      tipo: "album",
      puntuacion: value,
      titulo: title,
      artista: artist,
    }).catch(console.error);
  }

  useEffect(() => {
    if (!isAuthenticated) return;

    getMyRating(item.id, "album")
      .then((data) => {
        if (data) setRating(data.puntuacion);
      })
      .catch(() => setRating(0));
  }, [isAuthenticated, item.id]);

  function handleFavorite() {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }

    const favorito = {
      discogsId: item.id,
      tipo: "album",
      titulo: title,
      artista: artist,
    };

    if (isFavorite) {
      removeFavorite(item.id, "album")
        .then(() => setIsFavorite(false))
        .catch(console.error);
    } else {
      addFavorite(favorito)
        .then(() => setIsFavorite(true))
        .catch(console.error);
    }
  }

  return (
    <li className="album-card">
      <div
        className="album-card__image"
        style={{ backgroundImage: `url(${item.cover_image})` }}
      >
        <button
          className={`album-card__favorite ${isFavorite ? "is-active" : ""}`}
          onClick={handleFavorite}
        >
          <img src={Heart} alt="Favorite" />
        </button>
      </div>

      <div className="album-card__content">
        <p className="album-card__artist">{artist}</p>
        <p className="album-card__title">{title}</p>
        <div className="album-card__rating">
          {[1, 2, 3, 4, 5].map((star) => {
            const isActive = hoverRating ? star <= hoverRating : star <= rating;

            return (
              <button
                key={star}
                className={`album-card__star ${isActive ? "is-active" : ""}`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRate(star)}
              >
                ★
              </button>
            );
          })}
        </div>
      </div>
    </li>
  );
}
