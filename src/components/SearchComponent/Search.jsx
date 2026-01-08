import "./Search.style.scss";

function Search() {
  return (
    <section className="search-section">
      <div className="search-title-container">
        <h2>Descubre Música</h2>
        <h3>Busca tus canciones, artistas y álbumes favoritos</h3>
      </div>
      <div className="search-bar-button">
        <input
          type="text"
          placeholder="Busca canciones, artistas, álbumes..."
          className="search-input"
        />
        <button className="search-button">Buscar</button>
      </div>
    </section>
  );
}

export default Search;
