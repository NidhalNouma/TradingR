import React from "react";
import { useLocation, useParams } from "react-router-dom";

import Navbar from "../../global/navbar";
import Footer from "../../global/footer";
import PostContent from "./Post";
import Auther from "./Auther";
import Comments from "./Comments";

import { GetById } from "../../Hooks/Post";

function Post(props) {
  const p = props.location.post;

  const { pathname } = useLocation();
  const { id } = useParams();
  const { post, getPostId, setPost } = GetById(id);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (p) {
      setPost(p);
    } else getPostId();
  }, [pathname]);

  return (
    <>
      <Navbar here={true} loc={props.type} />
      {post && (
        <div className="post-container">
          <PostContent content={post.content} title={post.title} />
          <Auther />
          <div className="hr"></div>
          <Comments />
        </div>
      )}
      <Footer />
    </>
  );
}

export default Post;
