import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Cardlist from "./cardlist";
import Noprod from "./Noprod";

import { useDispatch, useSelector } from "react-redux";
import { GetCard } from "../../../Actions";

export default function Card(props) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleClick = (e) => {
    if (document.getElementById("card")) {
      if (!document.getElementById("card").contains(e.target)) {
        document.removeEventListener("click", handleClick);
        props.close();
      }
    } else {
      document.removeEventListener("click", handleClick);
    }
  };

  useEffect(() => {
    if (user && !user.cards) dispatch(GetCard());
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      props.close();
    };
  }, []);

  return (
    <>
      <div className="card-list" id="card">
        {user && user.card && user.card.length > 0 ? (
          <>
            <ul>
              {user.card.map((element) => {
                return <Cardlist key={element} data={element} />;
              })}
            </ul>
            <div className="total">
              <h5>Total :</h5>
              <h6>${user.card && user.card.length ? user.card.length : 0}</h6>
              <Link to="/card"> Go to Cart</Link>
            </div>
          </>
        ) : (
          <Noprod />
        )}
      </div>
    </>
  );
}
