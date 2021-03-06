import { useMovieDetails } from "../api/useMovieDetails";
import { useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import { SEARCH_MOVIES_QUERY } from "../api/searchMoviesQuery";
import { useParams, Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

export function DetailsPage() {
  const { title, id } = useParams();
  const { loading: moviesLoading, data } = useQuery(SEARCH_MOVIES_QUERY, {
    variables: { name: title },
  });
  const movie = data && data.searchMovies.filter((m) => m.id === id)[0];

  const { name, releaseDate } = movie || {};

  const {
    details,
    loading: detailsLoading,
    url: wikipediaUrl,
    imdbUrl,
  } = useMovieDetails(name, releaseDate && new Date(releaseDate).getFullYear());

  if (data && !movie) return <div>Cannot find movie details.</div>;

  const isLoading = moviesLoading || detailsLoading;

  return (
    <Container maxWidth="sm">
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Stack spacing={2}>
          <Typography variant="h3">{movie && movie.name}</Typography>
          <Typography variant="h4">Details from Wikipedia</Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {isLoading && <CircularProgress />}
          </Box>
          {!isLoading && (
            <>
              <div>{details}</div>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Stack
                  spacing={2}
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  {movie && (
                    <Link
                      href={movie.socialMedia.imdb || imdbUrl}
                      target="_blank"
                    >
                      Open Imdb
                    </Link>
                  )}
                  {wikipediaUrl && (
                    <Link href={wikipediaUrl} target="_blank">
                      Open Wikipedia
                    </Link>
                  )}
                </Stack>
              </Box>
            </>
          )}
          <Link component={RouterLink} to={`/search/${title}`}>
            Back to result
          </Link>
        </Stack>
      </Box>
    </Container>
  );
}
