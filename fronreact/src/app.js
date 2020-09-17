import React from "react";
import { createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  StartIo,
  On,
  OnA,
  AddImpro,
  Onq,
  OnqA,
  AddQa,
  Onp,
  Plus,
  Onm,
  Minus,
  AddImproAns,
  AddQaAns,
  Inc,
} from "./Actions";

import "./style/index.css";
import "./style/global.css";
import "./style/page.css";
import "./style/global/card.css";
import "./style/global/face.css";
import "./style/global/navbar.css";
import "./style/global/navfil.css";
import "./style/global/footer.css";
import "./style/global/pagenumber.css";
import "./style/pages/createaccount.css";
import "./style/pages/signin.css";
import "./style/pages/home.css";
import "./style/pages/profile.css";
import "./style/pages/wpage.css";
import "./style/product/productlist.css";

import Welcome from "./component/welcomepage";
import Home from "./component/home";
import Profile from "./component/profile";
import Productp from "./component/profile/product";
import Notification from "./component/profile/notification";
import Setting from "./component/profile/setting";
import Notfound from "./component/notFound";
import Producte from "./component/productPage";
import Products from "./component/productsList";
import ContactUs from "./component/others/ContacUs";
import Alan from "./component/Alan";

const DarkStyles = createGlobalStyle`
html {
    --scolor: #616e3c;
    --pcolor: #f4f2f0;
    --tcolor: #acc270;
    --bgcolor: #131806;
    --shcolor: #a8cf3b59;
    --pricecolor: #f27a02;
    --textcolor: white;
}
`;

const LightStyle = createGlobalStyle`
html {
    --pcolor: #616e3c;
    --scolor: #f4f2f0;
    --tcolor: #a8cf3b;
    --pricecolor: #f27a02;
    --bgcolor: white;
    --shcolor: #a8cf3b59;
    --textcolor: black;
}
`;

export default function App() {
  const user = useSelector((state) => state.user);
  const dark = useSelector((state) => state.Dark);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(StartIo());
    dispatch(
      On({
        d: (msg) => dispatch(AddImpro(msg)),
        r: () => dispatch(Inc()),
      })
    );
    dispatch(
      Onq({
        d: (msg) => dispatch(AddQa(msg)),
        r: () => dispatch(Inc()),
      })
    );
    dispatch(
      Onp({
        d: (msg) => dispatch(Plus(msg)),
        r: () => dispatch(Inc()),
      })
    );
    dispatch(
      Onm({
        d: (msg) => dispatch(Minus(msg)),
        r: () => dispatch(Inc()),
      })
    );
    dispatch(
      OnA({
        d: (msg) => dispatch(AddImproAns(msg)),
        r: () => dispatch(Inc()),
      })
    );
    dispatch(
      OnqA({
        d: (msg) => dispatch(AddQaAns(msg)),
        r: () => dispatch(Inc()),
      })
    );
  }, [user]);

  return (
    <>
      <Router>
        {dark ? <DarkStyles /> : <LightStyle />}
        <React.StrictMode>
          <Switch>
            <Route exact path="/source">
              <Products type="SOURCE" />
            </Route>
            <Route exact path="/product/:id">
              <Producte />
            </Route>
            <Route exact path="/strategys">
              <Products type="ROBOT" />
            </Route>
            <Route exact path="/product/:id">
              <Producte />
            </Route>
            <Route exact path="/indicators">
              <Products type="INDICATOR" />
            </Route>
            <Route exact path="/product/:id">
              <Producte />
            </Route>
            <Route exact path="/welcome">
              <Welcome />
            </Route>
            <Route exact path="/contactus">
              <ContactUs />
            </Route>
            <Route exact path="/profile">
              {user ? <Profile /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/profile/products">
              {user ? <Productp /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/profile/notifications">
              {user ? <Notification /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/profile/subscription">
              {user ? <Notification /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/profile/settings">
              {user ? <Setting /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/">
              {localStorage.getItem("visit") === "true" ? (
                <Home />
              ) : (
                <Redirect to="/welcome" />
              )}
            </Route>
            <Route exact path="/search/:query">
              <Products type="SEARCH" />
            </Route>

            <Route>
              <Notfound />
            </Route>
          </Switch>
        </React.StrictMode>
      </Router>
      <Alan />
    </>
  );
}
