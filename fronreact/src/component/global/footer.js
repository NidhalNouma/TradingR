import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Switch } from "@material-ui/core";

import { Dark } from "../../app";

export default function Footer() {
  const { dark, setDark } = useContext(Dark);

  React.useEffect(() => {
    if (localStorage.getItem("DARKLIGHT") === "ON") {
      setDark(true);
    }
  }, [dark]);

  return (
    <div className="containFooter">
      <br />
      <hr />
      <div className="footer">
        <Link className="aspan" to="/welcome">
          What's Trading Revelotion
        </Link>
        <Link className="aspan" to="/">
          How it works{" "}
        </Link>
        <Link className="aspan" to="/">
          Q&A
        </Link>
        <Link className="aspan" to="/contactus">
          Contact Us
        </Link>
        <span className="aspan">
          {" "}
          &copy; CopyRight {new Date().getFullYear()} NN{" "}
        </span>
        <Switch
          size="small"
          checked={dark}
          onChange={(e) => {
            const dl = localStorage.getItem("DARKLIGHT");
            if (dl === "ON") {
              localStorage.setItem("DARKLIGHT", "OFF");
              setDark(false);
            } else {
              localStorage.setItem("DARKLIGHT", "ON");
              setDark(true);
            }
          }}
          name="dark"
        />
      </div>
    </div>
  );
}
