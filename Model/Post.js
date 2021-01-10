const mongoose = require("mongoose");

const replySchema = mongoose.Schema({
  creatAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Types.ObjectId, ref: "User", requierd: true },
  content: { type: String, required: true },
  show: { type: Boolean, default: true },
});

const commentSchema = mongoose.Schema({
  creatAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Types.ObjectId, ref: "User", requierd: true },
  content: { type: String, required: true },
  reply: [replySchema],
  show: { type: Boolean, default: true },
});

const postSchema = mongoose.Schema({
  creatAt: { type: Date, default: Date.now },
  title: { type: String, required: true },
  content: { type: String, required: true },
  authId: { type: mongoose.Types.ObjectId, ref: "User", requierd: true },
  likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  comments: [commentSchema],
  show: { type: Boolean, default: true },
});

const Post = mongoose.model("Post", postSchema);

const findAll = async function () {
  console.log("\x1b[36m%s\x1b[0m", `find All Posts ...`);
  let r = { res: null, err: null };
  try {
    r.res = await Post.find();
    console.log("\x1b[35m%s\x1b[0m", `All Posts founded ...`);
  } catch (e) {
    r.err = e;
    console.log("\x1b[31m%s\x1b[0m", `Error with Finding Posts ==> ${e}`);
  }

  return r;
};

const findById = async function (_id) {
  console.log("\x1b[36m%s\x1b[0m", `Finding Post by ID ${_id} ...`);
  const r = { res: null, err: null };
  try {
    r.res = await Post.findOne({ _id }).populate({
      path: "authId",
      select: "userPicture  userName score",
    });
    console.log("\x1b[35m%s\x1b[0m", `Post ID ${_id} founded ...`);
  } catch (e) {
    r.err = e;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with finding Post by ID ${_id}  ==> ${e}`
    );
  }

  return r;
};

const findByAuth = async function (authId) {
  console.log("\x1b[36m%s\x1b[0m", `Finding Posts by authId ${authId} ...`);
  const r = { res: null, err: null };
  try {
    r.res = await Post.find({ authId }).populate({
      path: "authId",
      select: "userPicture userName score",
    });
    console.log("\x1b[35m%s\x1b[0m", `Posts by  authId ${authId} founded ...`);
  } catch (e) {
    r.err = e;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with finding Posts by authId ${authId}  ==> ${e}`
    );
  }

  return r;
};

const addPost = async function (authId, title, content) {
  console.log("\x1b[36m%s\x1b[0m", `Adding New Post ...`);
  const post = new Post({
    authId,
    title,
    content,
  });
  let r = { res: null, err: null, added: false };
  const err = post.validateSync();
  if (err) {
    r.err = err;
    console.log("\x1b[31m%s\x1b[0m", `Error with Validate new Post ==> ${err}`);
    return r;
  }

  try {
    r.res = await post.save();
    r.added = true;
    console.log("\x1b[35m%s\x1b[0m", `Post saved ...`);
  } catch (e) {
    r.err = e;
    console.log("\x1b[31m%s\x1b[0m", `Error with Adding new Post ==> ${e}`);
  }

  return r;
};

const postComment = async function (id, userId, content) {
  console.log("\x1b[36m%s\x1b[0m", `Adding New Comment to Post ${id} ...`);

  const CommentPost = mongoose.model("Comment", commentSchema);
  const com = new CommentPost({
    userId,
    content,
  });
  let r = { id: null, err: null, added: false };
  try {
    r.res = await Post.updateOne({ _id: id }, { $push: { comments: com } });
    r.added = true;
    r.id = com._id;
    console.log("\x1b[35m%s\x1b[0m", `Comment added to Post ${id} ...`);
  } catch (e) {
    r.err = e;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with Adding Comment to Post ${id} ==> ${e}`
    );
  }

  return r;
};

const postReply = async function (id, cId, userId, content) {
  console.log("\x1b[36m%s\x1b[0m", `Adding New Comment to Post ${id} ...`);

  const replyPost = mongoose.model("Reply", replySchema);
  const com = new replyPost({
    userId,
    content,
  });
  let r = { id: null, err: null, added: false };
  try {
    r.res = await Post.updateOne(
      { _id: id, "comments._id": cId },
      { $push: { "comments.$.reply": com } }
    );
    r.added = true;
    r.id = com._id;
    console.log("\x1b[35m%s\x1b[0m", `Comment added to Post ${id} ...`);
  } catch (e) {
    r.err = e;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with Adding Comment to Post ${id} ==> ${e}`
    );
  }

  return r;
};

module.exports = {
  findAll,
  findById,
  findByAuth,
  addPost,
  postComment,
  postReply,
};
