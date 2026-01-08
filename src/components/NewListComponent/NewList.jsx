import { useEffect, useState } from "react";
import { getBestSelling } from "../../services/getBestSelling";
import Heart from "../../assets/heart.svg";
import "./NewList.style.scss";

export default function NewList() {
  const [bestSellings, setBestSellings] = useState([]);
  const [userHasSearched, setUserHasSearched] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const [bestSellings] = await Promise.all([
        getBestSelling({limit: 8, sort: 'year', sort_order: 'desc' }),
      ]);

      setBestSellings(bestSellings.results);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <p>Cargando rankings…</p>;

return (
  <section>
    {!userHasSearched && (
      <>
        <h2>Últimos lanzamientos</h2>
        <section className="newList-container">
          <div>
            <ul className="grid">
              {bestSellings.map((bestSelling) => (
                <li key={bestSelling.id} className="newList-card">
                  <img
                    src={bestSelling.cover_image}
                    alt={bestSelling.title}
                    className="newlist-cover"
                  />
                  <strong>{bestSelling.title}</strong>
                  <p>
                    <img src={Heart} alt="Heart" />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </>
    )} 
    {userHasSearched && <p>Realiza una búsqueda para ver resultados.</p>}
  </section>
);
}
