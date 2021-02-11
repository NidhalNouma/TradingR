import React from "react";
import { useParams } from "react-router-dom";

import Navbar from "../global/navbar";
import Footer from "../global/footer";
import UserImg from "../../asset/images/UserImg";
import Badge from "../Badge";

import Dirtemp from "../profile/Dirtemp";
import Loadp from "../profile/Loadp";
import { GetUserByUserName } from "../Hooks/User";

function Index() {
  const { userName } = useParams();
  const { user, qas, impro, qa, setQa } = GetUserByUserName(userName);

  return (
    <>
      <Navbar here={true} />
      <div className="containProfile">
        <div className="left"></div>
        <div className="right">
          <div className="profile">
            {user.userPicture !== "noimg" ? (
              <img src={user.userPicture} alt="ProfileImg" />
            ) : (
              <UserImg />
            )}
            <div>
              <h4 className="flex md-5">
                {user.userName ? user.firstName + " " + user.lastName : "N/A"}
                <Badge pr={user.subscription} />
              </h4>
              <h5>@{user ? user.userName : "N/A"}</h5>
              <h5>Score: {user.score ? user.score : "0"}</h5>
              {/* <h6>
                Join at:{"  "}
                <i>
                  {user.joinAt
                    ? new Date(user.joinAt).getMonth() +
                      "/ " +
                      new Date(user.joinAt).getFullYear()
                    : "N/A"}
                </i>
              </h6> */}
            </div>
          </div>
          <div className="qaim">
            <div>
              {/* <h6 className={qa === 0 ? "active" : ""} onClick={() => setQa(0)}>
                Posts
              </h6> */}
              <h6 className={qa === 1 ? "active" : ""} onClick={() => setQa(1)}>
                Improvements
              </h6>
              <h6 className={qa === 2 ? "active" : ""} onClick={() => setQa(2)}>
                Questions
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

export default Index;
