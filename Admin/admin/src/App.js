import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import AddProduct from "./views/AddProduct";
import Posts from "./views/Posts";
import Robots from "./views/Robots";
import Indicators from "./views/Indicators";
import Users from "./views/Users";
import Product from "./views/Product";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/posts">
          <Posts />
        </Route>
        <Route exact path="/robots">
          <Robots />
        </Route>
        <Route exact path="/indicators">
          <Indicators />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/robots/add">
          <AddProduct ty={2} type="EA" />
        </Route>
        <Route exact path="/robots/:id" component={Product} />
        <Route exact path="/indicators/add">
          <AddProduct ty={3} type="Indicator" />
        </Route>
        <Route exact path="/indicators/:id" component={Product} />
      </Switch>
    </Router>
  );
}

export default App;
