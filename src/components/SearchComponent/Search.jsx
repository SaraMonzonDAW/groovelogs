import "./Search.style.scss";

function Search({ value, onChange, onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearch();
  }

  return (
    <section className="search-section">
      <div className="search-title-container">
        <h2>Descubre Música</h2>
        <h3>Busca tus canciones, artistas y álbumes favoritos</h3>
      </div>

      <form
        className="search-bar-button"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Busca canciones, artistas, álbumes..."
          className="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button className="search-button" type="submit">
          Buscar
        </button>
      </form>
    </section>
  );
}

export default Search;

