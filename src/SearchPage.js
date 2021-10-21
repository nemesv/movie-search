import { useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import { SearchForm } from "./SearchForm";
import { MovieSearchResult } from "./MovieSearchResult";
import { MOVIES_QUERY } from "./moviesQuery";
import {
  useHistory,
  useParams
} from "react-router-dom";

export function SearchPage() {
  const { title } = useParams();
  const history = useHistory();
  const { loading, error, data } = useQuery(MOVIES_QUERY, {
    variables: { name: title },
  });

  return (
    <>
      <SearchForm
        label="Movie:"
        defaultValue={title}
        onSearch={(value) => history.push(`/search/${value}`)} />
      {loading && <CircularProgress />}
      {data && <MovieSearchResult rows={data.searchMovies} />}
    </>
  );
}
