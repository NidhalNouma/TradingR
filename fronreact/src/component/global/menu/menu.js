import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Menu(props) {
  const login = useSelector((state) => state.login);

  const handleClick = (e) => {
    if (document.getElementById("menu-nav")) {
      if (!document.getElementById("menu-nav").contains(e.target)) {
        document.removeEventListener("click", handleClick);
        props.close();
      }
    } else {
      document.removeEventListener("click", handleClick);
    }
  };

  document.addEventListener("click", handleClick);

  return (
    <>
      <div className="menu-nav" id="menu-nav">
        <ul>
          <li>
            <Link to="/strategys">Robots</Link>
          </li>
          <li>
            <Link to="/indicators">Indicators</Link>
          </li>
          <li>
            <Link to="/source">Source</Link>
          </li>
          <li>
            {props.user ? (
              <>
                <Link to="/">Profile</Link>
                <li>
                  <Link to="/">Notifications</Link>
                </li>
              </>
            ) : (
              <a
                className="signin"
                onClick={() => {
                  document.removeEventListener("click", handleClick);
                  props.close();
                  props.sign();
                }}
              >
                Sign In
              </a>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
