import { useEffect, useState } from "react";
import { getBestSelling } from "../../services/getBestSelling";
import AlbumCard from "../AlbumCardComponent/AlbumCard";
import "./NewList.style.scss";

export default function NewList() {
  const [bestSellings, setBestSellings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const isLoggedIn = false;

  useEffect(() => {
    async function load() {
      const response = await getBestSelling({
        limit: 8,
        sort: "year",
        sort_order: "desc",
      });

      setBestSellings(response.results);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p>Cargando rankings…</p>;

  return (
    <>
      <section className="new-list">
        <h2>Últimos lanzamientos</h2>

        <ul className="new-list__grid">
          {bestSellings.map((item) => (
            <AlbumCard
              key={item.id}
              item={item}
              isLoggedIn={isLoggedIn}
              onRequireAuth={() => setShowAuthPopup(true)}
            />
          ))}
        </ul>
      </section>

      {showAuthPopup && (
        <div className="auth-popup">
          <div className="auth-popup__content">
            <p className="pop-up">Debes iniciar sesión o registrarte para puntuar.</p>
            <button onClick={() => setShowAuthPopup(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
