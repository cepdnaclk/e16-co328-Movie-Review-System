import {React} from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import SearchAppBar from './components/header';
import Home from './components/home';
import Movie from "./components/movie";
import Search from "./components/search";
import Login from "./components/login";

function App() {

  return (
    <div >
      <SearchAppBar/>
      <Router>
        <Switch>

          <Route exact path='/'>
          <Home/>
          </Route>

          <Route path="/movie/:query">
            <Movie />
          </Route>

          <Route path="/search/:query">
            <Search />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
