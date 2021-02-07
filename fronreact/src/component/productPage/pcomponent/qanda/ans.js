import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import UserImg from "../../../../asset/images/UserImg";

function Ans({ data }) {
  return (
    <div className="pl1 ml1 mu-5 md1 border-left">
      <Link className="flex ah" to="">
        {data.userId.userPicture && data.userId.userPicture !== "noimg" ? (
          <img className="imgP1" src={data.userId.userPicture} alt="" />
        ) : (
          <UserImg />
        )}
        <h5 className="h51 ml-5">{data.userId.userName}</h5>
      </Link>
      <p className="pg2 ml1 mu-5 md-5">{data.answer}</p>
      <i className="i1 ml-5">{moment(new Date(data.timestamp)).fromNow()}</i>
    </div>
  );
}

export default Ans;
