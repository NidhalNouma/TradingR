import React from "react";
import Navp from "./Navp";
import Navbar from "../global/navbar";
import Footer from "../global/footer";
import PostList from "./PostList";
import LoadPost from "./LoadPost";

import { GetAll } from "../Hooks/Post";

function Posts() {
  const nopr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { posts, getPosts } = GetAll();
  React.useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Navbar here={false} loc={"POSTS"} />
      <Navp />
      <div className="posts">
        {posts
          ? posts.map((i) => <PostList key={i._id} p={i} />)
          : nopr.map((i) => <LoadPost key={i} />)}
      </div>
      <Footer />
    </>
  );
}

export default Posts;
