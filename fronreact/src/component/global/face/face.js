import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserC } from "../../Hooks/User";
import UserImg from "../../../asset/images/UserImg";

export default function Face(props) {
  const { user, setUser } = useContext(UserC);
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
              {user && user.userPicture !== "noimg" ? (
                <img
                  className="imgP1 mr-5"
                  src={user.userPicture}
                  alt="ProfileImg"
                />
              ) : (
                <div className="mr-5 svgh">
                  <UserImg />
                </div>
              )}
              <span>Profile</span>
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
