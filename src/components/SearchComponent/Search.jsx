import "./Search.style.scss";

function Search({ value, onChange, onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSearch();
  }

  return (
    <section className="search-section">
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

