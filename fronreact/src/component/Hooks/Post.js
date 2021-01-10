import { useState } from "react";
import axios from "axios";

export const GetAll = () => {
  const [posts, setPosts] = useState(null);

  const getPosts = async () => {
    setPosts(null);
    const data = await axios.get("/api/post");
    let res = data.data.result;
    if (res) {
      setPosts(res);
    }
  };

  return { posts, getPosts };
};

export const GetById = (id) => {
  const [post, setPost] = useState(null);

  const getPostId = async () => {
    setPost(null);
    const data = await axios.get("/api/post/" + id);
    let res = data.data.result;
    if (res) {
      setPost(res);
    }
  };

  return { post, getPostId, setPost };
};

export const NewPost = async (authId, title, content) => {
  const data = {
    title,
    content,
    authId,
  };

  const r = await axios.post("/api/post", data);
  if (r.data.added) {
    console.log(r.data);
    return true;
  }
};

export const PostComment = async (id, userId, content) => {
  const data = {
    id,
    content,
    userId,
  };

  const r = await axios.post("/api/post/comment", data);
  if (r.data.added) {
    console.log(r.data);
  }
};

export const ReplyComment = async (id, cId, userId, content) => {
  const data = {
    id,
    content,
    userId,
    cId,
  };

  const r = await axios.post("/api/post/comment/reply", data);
  if (r.data.added) {
    console.log(r.data);
  }
};
