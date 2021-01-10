import React from "react";
import { Link } from "react-router-dom";
import ThumpUp from "../../asset/images/thumpUp";
import Message from "../../asset/images/message";
import RightArrow from "../../asset/images/rightArrow";

import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

function PostList({ p }) {
  return (
    <>
      <div className="md2 border">
        <Link to={{ pathname: "/posts/" + p._id, post: p }} className="ah">
          <h4 className="h4 md-5  font-1">{p.title}</h4>
          <div className="p-5 ">
            <FroalaEditorView model={p.content} />
          </div>
        </Link>
        <div className="flexB svg1 btmr">
          <Link
            to={{ pathname: "/posts/" + p._id, post: p }}
            className="bold aspan flexA"
          >
            <span className="mr-5">Read More</span> <RightArrow />
          </Link>
          <div className="flexB svg1">
            <ThumpUp />
            <span className="span mr-25">33</span>
            <Message />
            <span className="span">33</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostList;
