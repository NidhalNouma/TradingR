import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Navbar from "../global/navbar";
import Footer from "../global/footer";
import UserImg from "../../asset/images/UserImg";

import Menup from "./menu";
import Dirtemp from "./Dirtemp";

import { UserC } from "../Hooks/User";

function Profile() {
  const { user } = useContext(UserC);
  const [qa, setQa] = useState(0);
  const [impro, setImpro] = useState(null);
  const [qas, setQas] = useState(null);

  useEffect(() => {
    // if (!user.improvements || !user.questions) {
    axios
      .get(`/api/user/imprqa/${user._id}`)
      .then((res) => {
        if (res.data.find) {
          setImpro(res.data.result.improvements);
          setQas(res.data.result.questions);
        }
      })
      .catch((err) => console.error(err));
    // }
  }, []);

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
              <h4>{user.username ? user.username : "N/A"}</h4>
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
              <h6 className={qa === 0 ? "active" : ""} onClick={() => setQa(0)}>
                Posts
              </h6>
              <h6 className={qa === 1 ? "active" : ""} onClick={() => setQa(1)}>
                Improvements
              </h6>
              <h6 className={qa === 2 ? "active" : ""} onClick={() => setQa(2)}>
                Questions
              </h6>
            </div>
            {qas && impro && <Dirtemp qa={qa} data={qa ? qas : impro} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
