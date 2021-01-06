import React from "react";

function Comment() {
  return (
    <div className="post-comment">
      <div>
        <div className="user">
          <img
            src="https://www.postplanner.com/hs-fs/hub/513577/file-2886416984-png/blog-files/facebook-profile-pic-vs-cover-photo-sq.png?width=250&height=250&name=facebook-profile-pic-vs-cover-photo-sq.png"
            alt="Profile Img"
            className="imgP"
          />
          <h5 className="h5">Name</h5>
        </div>
      </div>
      <div className="comment">
        <p className="p md1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="flexB">
          <i className="i">date time ..</i>
          <button className="buttonT">Reply</button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
