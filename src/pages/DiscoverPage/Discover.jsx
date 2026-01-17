import { useState } from "react";
import Search from "../../components/SearchComponent/Search";
import NewList from "../../components/NewListComponent/NewList";
import ResultsList from "../../components/ResultsListComponent/ResultsList";
import { searchDiscogs } from "../../services/searchDiscogs";
import TitleComponent from "../../components/TitleSearchComponent/TitleComponent";

export default function Discover() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    const data = await searchDiscogs({ query });
    setResults(data.results || []);
    setLoading(false);
  }

  return (
    <>
    {!hasSearched && <TitleComponent title={"Buscar Música"} subtitle="Encuentra tus canciones favoritas" />}
    {hasSearched && <TitleComponent title="Resultados de la búsqueda" subtitle="Explora nuestra colección completa" />}
      <Search
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
      />

      {!hasSearched && <NewList />}

      {hasSearched && (
        <ResultsList results={results} loading={loading} />
      )}
    </>
  );
}

