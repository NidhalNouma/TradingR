import React from "react";
import { Link } from "react-router-dom";

function Menup({ link }) {
  return (
    <>
      <ul>
        <li>
          <Link
            to="/profile"
            className={link === 1 ? "oActiv buttonT" : "buttonT o"}
          >
            Profile
          </Link>
        </li>
        {/* <li>
          <Link
            to="/profile/products"
            className={link === 2 ? "oActiv buttonT" : "buttonT o"}
          >
            Products
          </Link>
        </li> */}
        <li>
          <Link
            to="/profile/subscription"
            className={link === 5 ? "oActiv buttonT" : "buttonT o"}
          >
            Subscriptions
          </Link>
        </li>
        <li>
          <Link
            to="/profile/notifications"
            className={link === 3 ? "oActiv buttonT" : "buttonT o"}
          >
            Notifications
          </Link>
        </li>
        <li>
          <Link
            to="/profile/settings"
            className={link === 4 ? "oActiv buttonT" : "buttonT o"}
          >
            Settings
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Menup;
