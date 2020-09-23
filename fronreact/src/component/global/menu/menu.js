import React from "react";
import { Link } from "react-router-dom";
import { Logout } from "../../../Actions";
import { useDispatch } from "react-redux";

export default function Menu(props) {
  const dispatch = useDispatch();
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
                    className="profile-a"
                    onClick={() => props.close()}
                    to="/profile/products"
                  >
                    Products
                  </Link>
                  <Link
                    className="profile-a"
                    onClick={() => props.close()}
                    to="/profile/subscription"
                  >
                    Subscriptions
                  </Link>
                  <Link
                    className="profile-a"
                    onClick={() => props.close()}
                    to="/profile/notifications"
                  >
                    Notifications
                  </Link>
                  <Link
                    className="profile-a"
                    onClick={() => props.close()}
                    to="/profile/settings"
                  >
                    Settings
                  </Link>
                  <Link
                    className="profile-logout"
                    onClick={() => {
                      dispatch(Logout());
                      document.cookie =
                        "_SSDI=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                      props.close();
                    }}
                  >
                    LogOut
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
