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
import Placeholder from "../../assets/placeholder.png";

export default function AlbumCard({ item, searchTrack, onRequireAuth, index }) {
  const { isAuthenticated } = useAuth();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [average, setAverage] = useState(0);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

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
    if (!isAuthenticated) {
      setAverage(0);
      return;
    }

    getAverage(item.id, "album")
      .then((data) => setAverage(data.media))
      .catch(() => setAverage(0));
  }, [isAuthenticated, item.id]);

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

  async function handleFavorite() {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }

    if (favoriteLoading) return;

    const favorito = {
      discogsId: item.id,
      tipo: "album",
      titulo: title,
      artista: artist,
    };

    try {
      setFavoriteLoading(true);

      if (isFavorite) {
        await removeFavorite(item.id, "album");
        setIsFavorite(false);
      } else {
        await addFavorite(favorito);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFavoriteLoading(false);
    }
  }

  function getValidImage(url) {
    if (!url) return Placeholder;

    const cleanUrl = url.split("?")[0].toLowerCase();

    if (cleanUrl.endsWith(".jpeg")) {
      return url;
    }

    return Placeholder;
  }

  return (
    <li className="album-card">
      <div className="album-card__image">
        <img
          src={getValidImage(item.cover_image)}
          alt={title}
          width="250"
          height="250"
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          onError={(e) => {
            e.currentTarget.src = Placeholder;
          }}
        />
        <button
          className={`album-card__favorite 
    ${isFavorite ? "is-active" : ""} 
    ${favoriteLoading ? "is-loading" : ""}`}
          onClick={handleFavorite}
          disabled={favoriteLoading}
        >
          <img src={Heart} alt="Favorite" />
          {favoriteLoading && <span className="mini-spinner"></span>}
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
