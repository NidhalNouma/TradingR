import React from "react";
import UserImg from "../../../../asset/images/UserImg";

function Ans({ data }) {
  const time = new Date(data.timestamp);
  return (
    <div className="ans">
      <div>
        {data.userId.userPicture && data.userId.userPicture !== "noimg" ? (
          <img src={data.userId.userPicture} alt="" />
        ) : (
          <UserImg />
        )}
        <h4>{data.userId.username}</h4>
      </div>
      <p>{data.answer}</p>
      <i>
        {time.getDate() +
          " /" +
          time.getMonth() +
          " /" +
          time.getFullYear() +
          " -- " +
          time.getHours() +
          ":" +
          time.getMinutes()}
      </i>
    </div>
  );
}

export default Ans;
