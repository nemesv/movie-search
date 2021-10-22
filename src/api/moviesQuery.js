import { gql } from "@apollo/client";

export const MOVIES_QUERY = gql`
  query SearchMovies($name: String!) {
    searchMovies(query: $name) {
      id
      name
      genres {
        name
      }
      socialMedia {
          imdb
      }
      releaseDate
      score
      recommended {
        id
        name
        releaseDate
        score
        genres {
          name
        }
      }
    }
  }
`;
