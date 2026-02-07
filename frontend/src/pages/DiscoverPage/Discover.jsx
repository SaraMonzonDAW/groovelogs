import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Search from "../../components/SearchComponent/Search";
import NewList from "../../components/NewListComponent/NewList";
import ResultsList from "../../components/ResultsListComponent/ResultsList";
import { searchDiscogs } from "../../services/searchDiscogs";
import TitleComponent from "../../components/TitleSearchComponent/TitleComponent";

export default function Discover() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("q") || "";

  const [query, setQuery] = useState(queryFromUrl);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchResults() {
      if (!queryFromUrl) return;

      setLoading(true);
      const data = await searchDiscogs({ query: queryFromUrl });
      setResults(data.results || []);
      setLoading(false);
    }

    fetchResults();
  }, [queryFromUrl]);

  function handleSearch() {
    if (!query.trim()) return;

    setSearchParams({ q: query });
  }

  const hasSearched = !!queryFromUrl;

  return (
    <>
      {!hasSearched && (
        <TitleComponent
          title="Buscar Música"
          subtitle="Encuentra tus canciones favoritas"
        />
      )}

      {hasSearched && (
        <TitleComponent
          title="Resultados de la búsqueda"
          subtitle="Explora nuestra colección completa"
        />
      )}

      <Search value={query} onChange={setQuery} onSearch={handleSearch} />

      {!hasSearched && <NewList />}

      {hasSearched && (
        <ResultsList
          results={results}
          loading={loading}
          searchQuery={queryFromUrl}
        />
      )}
    </>
  );
}
