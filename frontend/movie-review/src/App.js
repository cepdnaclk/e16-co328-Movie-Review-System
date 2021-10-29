import {React} from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import SearchAppBar from './components/header';
import Home from './components/home';
import Movie from "./components/movie";
import Search from "./components/search";
import Signup from "./components/signup";
import Signin from "./components/signin";
import People from "./components/people";

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

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/signin">
            <Signin />
          </Route>

          <Route path="/people/:query">
            <People />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
