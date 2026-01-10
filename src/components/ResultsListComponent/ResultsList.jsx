import AlbumCard from "../AlbumCardComponent/AlbumCard";
import "./ResultList.style.scss";

export default function ResultsList({ results, loading }) {
  if (loading) return <p>Cargando resultados…</p>;

  if (!results.length) {
    return <p>No se encontraron resultados</p>;
  }

  return (
    <section>
      <h2>Resultados</h2>
      <ul className="results-grid">
        {results.map((item) => (
          <AlbumCard key={item.id} item={item} />
        ))}
      </ul>
    </section>
  );
}
