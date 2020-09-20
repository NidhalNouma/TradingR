import React from "react";
import { Link } from "react-router-dom";

export default function Menu(props) {
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
            <Link onClick={() => props.close()} to="/strategys">
              Robots
            </Link>
          </li>
          <li>
            <Link onClick={() => props.close()} to="/indicators">
              Indicators
            </Link>
          </li>
          <li>
            <Link onClick={() => props.close()} to="/source">
              Source
            </Link>
          </li>
          <li>
            {props.user ? (
              <>
                <Link onClick={() => props.close()} to="/profile">
                  Profile
                </Link>
                <li>
                  <Link
                    onClick={() => props.close()}
                    to="/profile/notifications"
                  >
                    Notifications
                  </Link>
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
