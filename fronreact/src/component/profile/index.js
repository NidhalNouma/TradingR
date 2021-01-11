import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Navbar from "../global/navbar";
import Footer from "../global/footer";
import UserImg from "../../asset/images/UserImg";

import Menup from "./menu";
import Dirtemp from "./Dirtemp";
import Loadp from "./Loadp";

import { UserC } from "../Hooks/User";
import LoadPost from "../Posts/LoadPost";

function Profile() {
  const { user } = useContext(UserC);
  const [qa, setQa] = useState(1);
  const [impro, setImpro] = useState(null);
  const [qas, setQas] = useState(null);

  useEffect(() => {
    if (qa === 1 && impro === null)
      axios
        .get(`/api/product/user/impro/${user._id}`)
        .then((res) => {
          console.log(res.data.result);
          if (res.data.result) {
            setImpro(res.data.result);
          }
        })
        .catch((err) => console.error(err));
    else if (qa === 2 && qas === null)
      axios
        .get(`/api/product/user/qandas/${user._id}`)
        .then((res) => {
          console.log(res.data.result);
          if (res.data.result) {
            setQas(res.data.result);
          }
        })
        .catch((err) => console.error(err));
  }, [qa]);

  return (
    <>
      <Navbar here={true} />
      <div className="containProfile">
        <div className="left">
          <Menup link={1} />
        </div>
        <div className="right">
          <div className="profile">
            {user.userPicture !== "noimg" ? (
              <img src={user.userPicture} alt="ProfileImg" />
            ) : (
              <UserImg />
            )}
            <div>
              <h4>{user.userName ? user.userName : "N/A"}</h4>
              <h5>Score: {user.score ? user.score : "0"}</h5>
              <h6>
                Join at:{"  "}
                <i>
                  {user.joinAt
                    ? new Date(user.joinAt).getMonth() +
                      "/ " +
                      new Date(user.joinAt).getFullYear()
                    : "N/A"}
                </i>
              </h6>
            </div>
          </div>
          <div className="qaim">
            <div>
              {/* <h6 className={qa === 0 ? "active" : ""} onClick={() => setQa(0)}>
                Posts
              </h6> */}
              <h6 className={qa === 1 ? "active" : ""} onClick={() => setQa(1)}>
                {impro && impro.length} Improvements
              </h6>
              <h6 className={qa === 2 ? "active" : ""} onClick={() => setQa(2)}>
                {qas && qas.length} Questions
              </h6>
            </div>
            {qa === 1 ? (
              impro ? (
                <Dirtemp qa={qa} data={impro} />
              ) : (
                <Loadp />
              )
            ) : qas ? (
              <Dirtemp qa={qa} data={qas} />
            ) : (
              <Loadp />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
