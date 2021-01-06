import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserC } from "../../Hooks/User";

export default function Face(props) {
  const { setUser } = useContext(UserC);
  const handleClick = (e) => {
    if (document.getElementById("face")) {
      if (!document.getElementById("face").contains(e.target)) {
        document.removeEventListener("click", handleClick);
        props.close();
      }
    } else {
      document.removeEventListener("click", handleClick);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      props.close();
    };
  });

  return (
    <>
      <div className="profile-nav" id="face">
        <ul>
          <li>
            <Link to="/profile" className="flex buttonT tHover">
              <img
                className="imgP1 mr-5"
                src="data:image/png;base64,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"
                alt=""
              />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/profile/products" className="buttonT tHover">
              My Products
            </Link>
          </li>
          <li>
            <Link to="/profile/subscription" className="buttonT tHover">
              Subscriptions
            </Link>
          </li>
          <li>
            <Link to="/profile/notifications" className="buttonT tHover">
              Notifications
            </Link>
          </li>
          <li>
            <Link to="/profile/settings" className="buttonT tHover">
              Settings
            </Link>
          </li>
          <li>
            <button
              className="buttonT"
              onClick={() => {
                setUser(null);
                document.cookie =
                  "_SSDI=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              }}
              style={{ color: "rgb(170, 160, 32)" }}
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
