import "./App.css";
import { SearchForm } from "./components/SearchForm";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import { DetailsPage } from "./pages/DetailsPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {({ history }) => {
              return (
                <div>
                  <h1>Welcome to Movie Search!</h1>
                  <SearchForm
                    label="Movie:"
                    onSearch={(value) => history.push(`/search/${value}`)}
                  />
                </div>
              );
            }}
          </Route>
          <Route path="/search/:title/:id" component={DetailsPage} />
          <Route path="/search/:title" component={SearchPage} />
          <Route path="/search">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
