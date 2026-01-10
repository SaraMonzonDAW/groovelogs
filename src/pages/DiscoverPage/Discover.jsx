import { useState } from "react";
import Search from "../../components/SearchComponent/Search";
import NewList from "../../components/NewListComponent/NewList";
import ResultsList from "../../components/ResultsListComponent/ResultsList";
import { searchDiscogs } from "../../services/searchDiscogs";

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

