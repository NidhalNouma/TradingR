import React from "react";
import Comment from "./Comment";

function Comments() {
  return (
    <div className="post-comments">
      <button className="button">Add Your Comment</button>
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
}

export default Comments;
