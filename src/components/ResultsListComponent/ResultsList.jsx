import { useState, useMemo } from "react";
import AlbumCard from "../AlbumCardComponent/AlbumCard";
import "./ResultList.style.scss";
import AuthModal from "../AuthModalComponent/AuthModal";

const FILTERS = [
  { label: "Todo", value: "all" },
  { label: "Canciones", value: "track" },
  { label: "Artistas", value: "artist" },
  { label: "Álbumes", value: "release" },
];

export default function ResultsList({ results, loading }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const isLoggedIn = false;

  const filteredResults = useMemo(() => {
    if (activeFilter === "all") return results;
    return results.filter(item => item.type === activeFilter);
  }, [results, activeFilter]);

  if (loading) return <p className="results-message">Cargando resultados…</p>;

  if (!results.length) {
    return (
      <p className="results-message">
        No se encontraron resultados para tu búsqueda
      </p>
    );
  }

  return (
    <section>
      <div className="filter-buttons">
        {FILTERS.map(filter => (
          <button
            key={filter.value}
            className={activeFilter === filter.value ? "active" : ""}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {!filteredResults.length ? (
        <p className="results-message">
          No hay resultados para{" "}
          <strong>
            {FILTERS.find(f => f.value === activeFilter)?.label}
          </strong>
        </p>
      ) : (
        <ul className="results-grid">
          {filteredResults.map(item => (
            <AlbumCard key={item.id} item={item} isLoggedIn={isLoggedIn}
              onRequireAuth={() => setShowAuthPopup(true)} />
          ))}
        </ul>
      )}
       {showAuthPopup && <AuthModal isOpen={showAuthPopup} onClose={() => setShowAuthPopup(false)} />}
    </section>
  );
}
