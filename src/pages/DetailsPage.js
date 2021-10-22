import { useMovieDetails } from "../api/useMovieDetails";
import { useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import { SEARCH_MOVIES_QUERY } from "../api/searchMoviesQuery";
import { useParams, Link } from "react-router-dom";

export function DetailsPage() {
  const { title, id } = useParams();
  const {
    loading: moviesLoading, error, data,
  } = useQuery(SEARCH_MOVIES_QUERY, {
    variables: { name: title },
  });
  let movie = (data && data.searchMovies.filter((m) => m.id == id)[0]);

  let { name, releaseDate } = movie || {};

  let { details, loading: detailsLoading, url: wikipediaUrl, imdbUrl } = useMovieDetails(
    name,
    releaseDate && new Date(releaseDate).getFullYear()
  );

  if (data && !movie)
    return <div>Cannot find movie details.</div>;

  return (
    <div>
      <h2>Details from Wikipedia:</h2>

      {(moviesLoading || detailsLoading) && <CircularProgress />}
      <div>
        {details}
      </div>
      {movie && <a href={movie.socialMedia.imdb || imdbUrl} target="_blank">Open Imdb</a>}
      {wikipediaUrl && <a href={wikipediaUrl} target="_blank">Open Wikipedia</a>}
      <Link to={`/search/${title}`}>Back to result</Link>
    </div>
  );
}
