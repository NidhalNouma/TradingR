import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddUserImp, AddUserQA } from "../../Actions";
import axios from "axios";

import Navbar from "../global/navbar";
import Footer from "../global/footer";
import UserImg from "../../asset/images/UserImg";

import Menup from "./menu";
import Dirtemp from "./Dirtemp";

function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [qa, setQa] = useState(false);

  useEffect(() => {
    // if (!user.improvements || !user.questions) {
    axios
      .get(`/api/user/imprqa/${user._id}`)
      .then((res) => {
        if (res.data.find) {
          dispatch(AddUserImp(res.data.result.improvements));
          dispatch(AddUserQA(res.data.result.questions));
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
              <img src={user.userPicture} />
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
              <h6
                className={qa === false ? "active" : ""}
                onClick={() => setQa(false)}
              >
                Improvements
              </h6>
              <h6 className={qa ? "active" : ""} onClick={() => setQa(true)}>
                Questions
              </h6>
            </div>
            {user.questions && user.improvements && (
              <Dirtemp qa={qa} data={qa ? user.questions : user.improvements} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
