import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";

import { Dark } from "../../app";

export default function Footer() {
  const { dark, setDark } = useContext(Dark);
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

  return (
    <div className="containFooter">
      <br />
      <hr />
      <div className="footer">
        <Link className="aspan-9" to="/welcome">
          What's Trading Revelotion
        </Link>
        <Link className="aspan-9" to="/">
          How it works{" "}
        </Link>
        <Link className="aspan-9" to="/">
          Q&A
        </Link>
        <Link className="aspan-9" to="/contactus">
          Contact Us
        </Link>
        <span className="aspan-9">
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
    </div>
  );
}
