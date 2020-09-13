import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@material-ui/core";

import { Dark, Light } from "../../Actions";

export default function Footer() {
  const dispatch = useDispatch();
  const dark = useSelector((state) => state.Dark);

  React.useEffect(() => {
    if (localStorage.getItem("DARKLIGHT") === "ON") {
      dispatch(Dark());
    }
  }, [dark, dispatch]);

  return (
    <div className="containFooter">
      <br />
      <hr />
      <div className="footer">
        <Link to="/welcome">What's Trading Revelotion</Link>
        <a>How it works</a>
        <a>Q&A</a>
        <Link to="/contactus">Contact Us</Link>
        <a>&copy; CopyRight {new Date().getFullYear()} NN </a>
        <Switch
          size="small"
          checked={dark}
          onChange={(e) => {
            const dl = localStorage.getItem("DARKLIGHT");
            if (dl === "ON") {
              localStorage.setItem("DARKLIGHT", "OFF");
              dispatch(Light());
            } else {
              localStorage.setItem("DARKLIGHT", "ON");
              dispatch(Dark());
            }
          }}
          name="dark"
        />
      </div>
    </div>
  );
}
