import { SearchForm } from "../components/SearchForm";
import { useHistory } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export function HomePage() {
  const history = useHistory();
  return (
    <Container>
      <Typography variant="h3">Welcome to Movie Search!</Typography>
      <SearchForm
        label="Movie title"
        onSearch={(value) => history.push(`/search/${value}`)}
      />
    </Container>
  );
}
