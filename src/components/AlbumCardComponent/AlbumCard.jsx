import { useState } from "react";
import Heart from "../../assets/heart.svg";
import "./AlbumCard.style.scss";

export default function AlbumCard({ item, isLoggedIn, onRequireAuth }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const [artist, title] = item.title.includes(" - ")
    ? item.title.split(" - ")
    : ["", item.title];

  function handleRate(value) {
    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }
    setRating(value);
    console.log("Album", item.id, "rated with", value);
  }

  function handleFavorite() {
    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }

    setIsFavorite((prev) => !prev);
    console.log(
      "Album",
      item.id,
      isFavorite ? "removed from favorites" : "added to favorites"
    );
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
          aria-label="Add to favorites"
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
                aria-label={`Rate ${star}`}
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
