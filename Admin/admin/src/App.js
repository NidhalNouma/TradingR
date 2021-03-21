import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import AddProduct from "./views/AddProduct";
import Posts from "./views/Posts";
import Robots from "./views/Robots";
import Indicators from "./views/Indicators";
import Users from "./views/Users";
import Product from "./views/Product";

function App() {
  const url = process.env.REACT_APP_URL;
  return (
    <Router>
      <Switch>
        <Route exact path={url + "/"}>
          <Dashboard />
        </Route>
        <Route exact path={url + "/posts"}>
          <Posts />
        </Route>
        <Route exact path={url + "/robots"}>
          <Robots />
        </Route>
        <Route exact path={url + "/indicators"}>
          <Indicators />
        </Route>
        <Route exact path={url + "/users"}>
          <Users />
        </Route>
        <Route exact path={url + "/robots/add"}>
          <AddProduct ty={2} type="EA" />
        </Route>
        <Route
          exact
          path={url + "/product/newversion/:id"}
          component={AddProduct}
        />
        <Route exact path={url + "/product/edit/:id"} component={AddProduct} />
        <Route exact path={url + "/robots/:id"} component={Product} />
        <Route exact path={url + "/indicators/add"}>
          <AddProduct ty={3} type="Indicator" />
        </Route>
        <Route exact path={url + "/indicators/:id"} component={Product} />
      </Switch>
    </Router>
  );
}

export default App;
