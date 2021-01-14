import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserC } from "../../Hooks/User";

export default function Menu(props) {
  const { setUser, check } = useContext(UserC);
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
            <Link
              onClick={() => props.close()}
              to="/pricing"
              className="aNav btnHover w1"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              onClick={() => props.close()}
              to="/strategys"
              className="aNav btnHover w1"
            >
              Robots
            </Link>
          </li>
          <li>
            <Link
              onClick={() => props.close()}
              to="/indicators"
              className="aNav btnHover w1"
            >
              Indicators
            </Link>
          </li>
          <li>
            {props.user ? (
              <>
                <Link
                  onClick={() => props.close()}
                  to="/profile"
                  className="aNav btnHover w1"
                >
                  Profile
                </Link>
                <li>
                  {/* <Link
                    className="aNav btnHover"
                    onClick={() => props.close()}
                    to="/profile/products"
                  >
                    Products
                  </Link> */}
                  <Link
                    className="aNav btnHover w1"
                    onClick={() => props.close()}
                    to="/profile/subscription"
                  >
                    Subscriptions
                  </Link>
                </li>
                <li>
                  <Link
                    className="aNav btnHover w1"
                    onClick={() => props.close()}
                    to="/profile/notifications"
                  >
                    Notifications
                  </Link>
                </li>
                <li>
                  <Link
                    className="aNav btnHover w1"
                    onClick={() => props.close()}
                    to="/profile/settings"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    className="profile-logout w2"
                    onClick={() => {
                      setUser(null);
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
              <button
                className="buttonP w1-5"
                onClick={() => {
                  document.removeEventListener("click", handleClick);
                  props.close();
                  check(true);
                }}
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
