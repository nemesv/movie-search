import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { SearchPage } from "./pages/SearchPage";
import { DetailsPage } from "./pages/DetailsPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
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
