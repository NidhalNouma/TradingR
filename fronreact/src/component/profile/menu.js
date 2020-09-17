import React from "react";
import { Link } from "react-router-dom";

function Menup({ link }) {
  return (
    <>
      <ul>
        <li>
          <Link to="/profile" className={link === 1 ? "profileActive" : ""}>
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/profile/products"
            className={link === 2 ? "profileActive" : ""}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/profile/subscription"
            className={link === 5 ? "profileActive" : ""}
          >
            Subscriptions
          </Link>
        </li>
        <li>
          <Link
            to="/profile/notifications"
            className={link === 3 ? "profileActive" : ""}
          >
            Notifications
          </Link>
        </li>
        <li>
          <Link
            to="/profile/settings"
            className={link === 4 ? "profileActive" : ""}
          >
            Settings
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Menup;
