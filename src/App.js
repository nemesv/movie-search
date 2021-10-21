import "./App.css";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { SearchForm } from "./SearchForm";
import { MovieSearchResult } from "./MovieSearchResult";
import { MOVIES_QUERY } from "./moviesQuery";

function App() {
  const [details, setDetails] = useState();

  const [getMovies, { loading, error, data }] = useLazyQuery(MOVIES_QUERY);

  function executeSearch(value) {
    setDetails(null);
    if (value) getMovies({ variables: { name: value } });
  }

  const showSpinner = loading;

  return (
    <div className="App">
      <SearchForm label="Movie:" onSearch={executeSearch} />
      {showSpinner && <CircularProgress />}
      {data && <MovieSearchResult rows={data.searchMovies} />}
    </div>
  );
}

export default App;
