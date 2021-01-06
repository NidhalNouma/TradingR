import React from "react";
import Navp from "./Navp";
import Navbar from "../global/navbar";
import Footer from "../global/footer";
import PostList from "./PostList";

function Posts() {
  return (
    <>
      <Navbar here={false} loc={"POSTS"} />
      <Navp />
      <div className="posts">
        <PostList />
        <PostList />
        <PostList />
      </div>
      <Footer />
    </>
  );
}

export default Posts;
