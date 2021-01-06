import React from "react";
import { Link } from "react-router-dom";
import ThumpUp from "../../asset/images/thumpUp";
import Message from "../../asset/images/message";
import RightArrow from "../../asset/images/rightArrow";

function PostList() {
  const url = "123";
  return (
    <>
      <div className="md4">
        <Link to={"/posts/" + url} className="ah">
          <h4 className="h4">Post title</h4>
        </Link>
        <p className="p md2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum
        </p>
        <div className="flexB svg1">
          <Link to={"/posts/" + url} className="a flexA">
            <span className="mr-5">Read More</span> <RightArrow />
          </Link>
          <div className="flexB svg1">
            <ThumpUp />
            <span className="span mr-5">33</span>
            <Message />
            <span className="span">33</span>
          </div>
        </div>
      </div>
      <div className="md4">
        <img
          alt="postImg"
          src="data:image/png;base64,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"
        />
      </div>
    </>
  );
}

export default PostList;
