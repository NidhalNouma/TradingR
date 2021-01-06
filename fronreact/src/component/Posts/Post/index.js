import React from "react";
import Navbar from "../../global/navbar";
import Footer from "../../global/footer";
import PostContent from "./Post";
import Auther from "./Auther";
import Comments from "./Comments";

function Post(props) {
  return (
    <>
      <Navbar here={true} loc={props.type} />
      <div className="post-container">
        <PostContent />
        <Auther />
        <div className="hr"></div>
        <Comments />
      </div>
      <Footer />
    </>
  );
}

export default Post;
