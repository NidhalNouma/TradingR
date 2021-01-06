import React from "react";
import MessageSVG from "../../../asset/images/message";
import LikeSVG from "../../../asset/images/thumpUp";

function Auther() {
  return (
    <div className="flexB">
      <div className="flexB">
        <span className="span mr1">Created by</span>
        <div>
          <img
            src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"
            alt="Auth Img"
            className="imgP"
          />
          <h5 className="h5">Name Auth</h5>
        </div>
      </div>
      <div className="svg1 flexB">
        <div className="flexB mr-5">
          <LikeSVG />
          <span className="span">22</span>
        </div>
        <div className="flexB">
          <MessageSVG />
          <span className="span">44</span>
        </div>
      </div>
    </div>
  );
}

export default Auther;
