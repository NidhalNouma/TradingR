import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

import { Dark } from "../../app";
import { UserC } from "../Hooks/User";

export default function Footer() {
  const { dark, setDark } = useContext(Dark);
  const { user } = useContext(UserC);
  const style = { fill: "var(--pcolor)", cursor: "pointer", width: "20px" };
  const darkClick = (e) => {
    const dl = localStorage.getItem("DARKLIGHT");
    if (dl === "ON") {
      localStorage.setItem("DARKLIGHT", "OFF");
      setDark(false);
    } else {
      localStorage.setItem("DARKLIGHT", "ON");
      setDark(true);
    }
  };
  const [num, setNum] = useState(0);
  const snum = () => {
    if (user && user.email === "nidhal.nouma.0@gmail.com") {
      setNum(num + 1);
    }
  };

  return (
    <div className="containFooter">
      <br />
      <hr />
      <div className="footer">
        <Link className="aspan-9" to="/welcome">
          What's Trading Revelotion
        </Link>
        <Link className="aspan-9" to="/how-it-works">
          How it works{" "}
        </Link>
        {/* <Link className="aspan-9" to="/">
          Q&A
        </Link> */}
        <Link className="aspan-9" to="/contactus">
          Contact Us
        </Link>
        <span className="aspan-9" onClick={snum}>
          &copy; CopyRight {new Date().getFullYear()} NN
        </span>
        <div className="svgHover flexC">
          {dark ? (
            <Brightness7Icon style={style} onClick={darkClick} />
          ) : (
            <Brightness4Icon style={style} onClick={darkClick} />
          )}
        </div>
      </div>

      {num > 3 && (
        <div className="hdiv">
          <form method="POST" action="/api/user/admin/dash" className="flexC">
            <input name="email" type="email" className="input" />
            <input name="password" type="password" className="input ml1 mr1" />
            <button className="buttonP" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
