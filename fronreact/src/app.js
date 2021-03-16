import "./style/index.css";
import "./style/ex.css";
import "./style/global/navbar.css";
import "./style/global/navfil.css";
import "./style/global/footer.css";
import "./style/pages/signin.css";
import "./style/pages/home.css";
import "./style/pages/profile.css";
import "./style/pages/posts.css";
import "./style/pages/post.css";
import "./style/pages/createpost.css";
import "./style/pages/profile.css";
import "./style/pages/wpage.css";
import "./style/pages/product.css";
import "./style/pages/productlist.css";
import "./style/pages/pricing.css";
import "./style/pages/howworks.css";

import "./style/gg/gg.css";
import "./style/gg/gg1.css";
import "./style/gg/gh.css";
import "./style/gg/ga.css";
import "./style/gg/gm.css";
import "./style/gg/gp.css";
import "./style/gg/gi.css";
import "./style/gg/gpg.css";

import Welcome from "./component/welcomepage";
import Home from "./component/home";
import Profile from "./component/profile";
import Productp from "./component/profile/product";
import Notification from "./component/profile/notification";
import Setting from "./component/profile/setting";
import Notfound from "./component/notFound";
import Pricing from "./component/pricing";
import Producte from "./component/productPage";
import Posts from "./component/Posts";
import ProfileShow from "./component/ProfileShow";
// import Post from "./component/Posts/Post";
// import CreatePost from "./component/Posts/Create";
import Products from "./component/productsList";
import ContactUs from "./component/others/ContacUs";
import HowWorks from "./Views/HowWorks";
// import Alan from "./component/Alan";

import React, { useState, useContext, createContext } from "react";
import { UserC } from "./component/Hooks/User";
import { createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const DarkStyles = createGlobalStyle`
html {
  --scolor: #616e3c;
  --pcolor: #f4f2f0;
  --tcolor: #4c5533;
  --bgcolor: #16180e;
  --shcolor: #a8cf3b59;
  --pricecolor: #f27a02;
  --textcolor: #c3c6bc;
  --timecolor: #a0b0a0;
  --cancelcolor: rgb(170, 160, 32);
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
    --timecolor: #a0b0a0;
    --cancelcolor: rgb(170, 160, 32); 
}
`;

export const Dark = createContext(true);

export default function App() {
  const { user } = useContext(UserC);
  // const notif = useSelector((state) => state.notif);
  const [dark, setDark] = useState(
    localStorage.getItem("DARKLIGHT") === "ON" ? true : false
  );
  const [first, setFirst] = React.useState(localStorage.getItem("visit"));

  React.useEffect(() => {
    if (first !== "true") {
      localStorage.setItem("visit", "true");
      setFirst("true");
    }
  }, [first]);

  return (
    <>
      <Dark.Provider value={{ dark, setDark }}>
        <Router>
          {dark ? <DarkStyles /> : <LightStyle />}
          <React.StrictMode>
            <Switch>
              <Route exact path="/pricing">
                <Pricing />
              </Route>
              <Route exact path="/posts">
                <Posts />
              </Route>
              {/* <Route exact path="/posts/create">
                <CreatePost />
              </Route>
              <Route exact path="/posts/:id" component={Post} /> */}
              <Route exact path="/strategys">
                <Products type="ROBOT" />
              </Route>
              <Route exact path="/product/:id" component={Producte} />
              <Route exact path="/indicators">
                <Products type="INDICATOR" />
              </Route>
              <Route exact path="/product/:id" component={Producte} />
              <Route exact path="/welcome">
                <Welcome />
              </Route>
              <Route exact path="/how-it-works">
                <HowWorks />
              </Route>
              <Route exact path="/contactus">
                <ContactUs />
              </Route>
              <Route exact path="/user/:userName">
                <ProfileShow />
              </Route>
              <Route exact path="/profile">
                {user ? <Profile /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/profile/products">
                {user ? <Productp link={2} /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/profile/notifications">
                {user ? <Notification /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/profile/subscription">
                {user ? <Productp link={5} /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/profile/settings">
                {user ? <Setting /> : <Redirect to="/" />}
              </Route>
              <Route exact path="/">
                {first === "true" ? <Home /> : <Redirect to="/welcome" />}
              </Route>
              <Route exact path="/reset-password/:email/:token">
                <Redirect to="/" />
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
        {/* <Alan /> */}
      </Dark.Provider>
    </>
  );
}
