import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import SearchAppBar from './components/header';
import Home from './components/home';
import Movie from "./components/movie";

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
