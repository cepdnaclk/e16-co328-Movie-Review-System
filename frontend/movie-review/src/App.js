import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import SearchAppBar from './components/header';
import Home from './components/home';

function App() {
  return (
    <div >
      <SearchAppBar/>
      <Router>
        <Switch>
          <Route exact path='/'>
          <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
