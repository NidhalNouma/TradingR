import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Switch } from "@material-ui/core";

import { Dark } from "../../app";

export default function Footer() {
  const { dark, setDark } = useContext(Dark);

  // React.useEffect(() => {
  //   if (localStorage.getItem("DARKLIGHT") === "ON") {
  //     setDark(true);
  //   }
  // }, [dark]);

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
