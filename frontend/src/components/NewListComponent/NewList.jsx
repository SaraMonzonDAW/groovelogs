import { useEffect, useState } from "react";
import { getBestSelling } from "../../services/getBestSelling";
import AlbumCard from "../AlbumCardComponent/AlbumCard";
import "./NewList.style.scss";
import AuthModal from "../AuthModalComponent/AuthModal";
import Spinner from "../Spinner/Spinner";

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

  if (loading) return <Spinner />;

  return (
    <>
      <section className="new-list">
        <h2>Últimos lanzamientos</h2>

        <ul className="new-list__grid">
          {bestSellings.map((item, index) => (
            <AlbumCard
              key={item.id}
              item={item}
              isLoggedIn={isLoggedIn}
              onRequireAuth={() => setShowAuthPopup(true)}
              index={index}
            />
          ))}
        </ul>
      </section>

      {showAuthPopup && (
        <AuthModal
          isOpen={showAuthPopup}
          onClose={() => setShowAuthPopup(false)}
        />
      )}
    </>
  );
}
