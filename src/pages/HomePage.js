import { SearchForm } from "../components/SearchForm";
import { useHistory } from "react-router-dom";

export function HomePage() {
  const history = useHistory();
  return (
    <div>
      <h1>Welcome to Movie Search!</h1>
      <SearchForm
        label="Movie:"
        onSearch={(value) => history.push(`/search/${value}`)}
      />
    </div>
  );
}
