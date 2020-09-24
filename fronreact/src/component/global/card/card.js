import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Cardlist from "./cardlist";
import Noprod from "./Noprod";

import { useDispatch, useSelector } from "react-redux";

export default function Card({ notif, close }) {
  const handleClick = (e) => {
    if (document.getElementById("card")) {
      if (!document.getElementById("card").contains(e.target)) {
        document.removeEventListener("click", handleClick);
        close();
      }
    } else {
      document.removeEventListener("click", handleClick);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      close();
    };
  }, []);

  return (
    <>
      <div className="card-list" id="card">
        {notif && notif.length > 0 ? (
          <>
            <ul>
              {notif
                .sort((a, b) => {
                  if (b.at < a.at) return -1;
                  else if (b.at > a.at) return 1;
                  else return 0;
                })
                .map((i) => {
                  return <Cardlist key={i._id} data={i} />;
                })}
            </ul>
            <div className="total">
              <span>Mark all as Read</span>
              <Link to="/profile/notifications">See All</Link>
            </div>
          </>
        ) : (
          <Noprod />
        )}
      </div>
    </>
  );
}
