import { SearchForm } from "../components/SearchForm";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";


export function HomePage() {
  const history = useHistory();
  return (
    <Container>
      <h1>Welcome to Movie Search!</h1>
      <SearchForm
        label="Movie title"
        onSearch={(value) => history.push(`/search/${value}`)}
      />
    </Container>
  );
}
