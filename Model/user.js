const mongoose = require("mongoose");

const qmSchema = new mongoose.Schema({
  id: { type: mongoose.Types.ObjectId, ref: "ProductVersion" },
  pId: { type: mongoose.Types.ObjectId, required: true },
  qmId: { type: mongoose.Types.ObjectId, required: true },
});
const qmModel = mongoose.model("QMUser", qmSchema);

const notifSchema = new mongoose.Schema({
  at: { type: Date, default: Date.now },
  read: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ["impro", "vote", "question", "postComment", "postLike", "Main"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  id: { type: mongoose.Types.ObjectId },
  pId: { type: mongoose.Types.ObjectId },
  productId: { type: mongoose.Types.ObjectId, ref: "ProductVersion" },
  postId: { type: mongoose.Types.ObjectId, ref: "Post" },
  fromId: { type: mongoose.Types.ObjectId, ref: "User" },
});
const notifModel = mongoose.model("Notification", notifSchema);

const userSchema = new mongoose.Schema({
  joinAt: { type: Date, default: Date.now },
  lastTime: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
  from: { type: String, enum: ["_", "FACEBOOK", "GOOGLE"], default: "_" },
  score: { type: Number, default: 0 },
  email: {
    type: String,
    required: [true, "Email is requierd"],
    unique: [true, "Email Exist"],
    validate: {
      validator: function (v) {
        return /(\w*\@\w*\.\w*)/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  userName: {
    type: String,
    required: [true, "userName is requierd"],
    unique: [true, "userName exist"],
  },
  password: { type: String, required: [true, "password is requierd"] },
  userPicture: { type: String, default: "noimg" },
  improvements: [qmSchema],
  questions: [qmSchema],
  posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  notifications: [notifSchema],
  subscribers: [{ type: mongoose.Types.ObjectId, ref: "ProductVersion" }],
  show: { type: Boolean, default: true },
});

const User = mongoose.model("User", userSchema);

const findAll = async function () {
  console.log("\x1b[36m%s\x1b[0m", `find All users ...`);
  let r = { res: null, err: null };
  try {
    r.res = await User.find();
    console.log("\x1b[35m%s\x1b[0m", `All users founded ...`);
  } catch (e) {
    r.err = e;
    console.log("\x1b[31m%s\x1b[0m", `Error with Finding Users ==> ${e}`);
  }

  return r;
};

const addnew = async function (email, username, password) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding New User ${username} with email ${email} ...`
  );
  let r = { res: null, err: null, found: true };
  const user = new User({
    email,
    userName: username,
    password,
  });

  const er = user.validateSync();
  if (er) {
    r.err = er;
    console.log("\x1b[31m%s\x1b[0m", `Error with Validate new User ==> ${er}`);
    return r;
  }

  try {
    r.res = await user.save();
    r.found = false;
    console.log("\x1b[35m%s\x1b[0m", `User saved ${username} ...`);
  } catch (e) {
    r.err = e;
    console.log("\x1b[31m%s\x1b[0m", `Error with Adding new User ==> ${e}`);
  }

  return r;
};

const addnewThird = async function (
  email,
  username,
  password,
  from,
  userPicture
) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding New User ${username} with email ${email} ...`
  );
  const user = new User({
    email,
    username,
    password,
    from,
    userPicture,
  });
  let r = { res: null, err: null, found: true };
  try {
    r.res = await user.save();
    r.found = false;
  } catch (e) {
    r.err = e;
    console.log("\x1b[31m%s\x1b[0m", `Error with Adding new User ==> ${e}`);
  }

  return r;
};

const findOne = async function (email, password) {
  console.log("\x1b[36m%s\x1b[0m", `Finding User with email ${email} ...`);
  let r = { res: null, err: null };
  try {
    r.res = await User.findOne({ email, password })
      .select("-improvements -questions")
      .populate({
        path: "notifications.productId",
        select: "products[0].title products[0].img",
      })
      .populate({
        path: "notifications.fromId",
        select: "userName _id userPicture",
      });
    console.log("\x1b[35m%s\x1b[0m", `Find User ==> ${email}`);
  } catch (e) {
    console.log("\x1b[31m%s\x1b[0m", `Error with finding User ==> ${e}`);
    r.err = e;
  }

  return r;
};

const findById = async function (_id) {
  console.log("\x1b[36m%s\x1b[0m", `Find User by ID ${_id} ...`);
  const r = { res: null, err: null };
  try {
    r.res = await User.findOne({ _id })
      .select("-improvements -questions")
      .populate({
        path: "notifications.product",
        select: "img  title timestamp",
      });
    console.log("\x1b[35m%s\x1b[0m", `Find User by ID ==> ${_id}`);
  } catch (e) {
    r.err = e;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with finding user by ID ${_id}  ==> ${e}`
    );
  }

  return r;
};

const getImprQa = async function (_id) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Find Impro & Questions for user ID ${_id} ...`
  );

  const r = { res: null, err: null };
  try {
    // r.res = await User.findOne({ _id })
    //   .populate({
    //     path: "improvements.id",
    //     match: { "products.improvements.userId": _id },
    //     select: "products.improvements.userId products.img  products.title",
    //   })
    //   .populate({
    //     path: "qandas.id",
    //     select: "products.qandas img  title timestamp",
    //   })
    //   .select("_id improvements questions");
    const pipeline = [
      { $match: { _id: mongoose.Types.ObjectId(_id) } },
      {
        $lookup: {
          from: "productVersion",
          localField: "improvements.id",
          foreignField: "_id",
          as: "impro",
        },
      },
      {
        $group: {
          _id: "$_id",
          impro: { $first: "$impro" },
          improvements: { $first: "$improvements" },
          qandas: { $first: "$questions" },
        },
      },
    ];
    r.res = await User.aggregate(pipeline);
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Found Impro & Questions for user ID ${_id}  ...`
    );
  } catch (e) {
    r.err = e;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with finding Impros & Questions for user ID ${_id}  ==> ${e}`
    );
  }

  return r;
};

// --------------------------------------------------------------------------------------------

const addNotif = async function (userId, notif) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `New notification for User_ID ${userId} ...`
  );
  let r = { res: null, err: null };
  try {
    const notf = checkNotif(notif);
    r.res = await User.updateOne(
      { _id: userId },
      { $push: { notifications: notf } }
    );
    console.log(
      "\x1b[35m%s\x1b[0m",
      `New Notification added User ${userId} ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with Adding the Notification to User_Id ${userId} ==> ${e}`
    );
    r.err = e;
  }

  return r;
};

const markNotifAsRead = async function (userId, _id) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Mark notification as read for User_ID ${userId} ...`
  );
  let r = { res: null, err: null };
  try {
    r.res = await User.updateOne(
      { _id: userId, "notifications._id": _id },
      { $set: { "notifications.readed": true } }
    );
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Notification ${_id} mark as Read User ${userId} ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with mark Notification as read for User_Id ${userId} ==> ${err}`
    );
    r.err = e;
  }

  return r;
};

const markAllNotifAsRead = async function (userId) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Mark all notifications as read for User_ID ${userId} ...`
  );
  let r = { res: null, err: null };
  try {
    r.res = await User.updateOne(
      { _id: userId },
      { $set: { "notifications.read": true } }
    );
    console.log(
      "\x1b[35m%s\x1b[0m",
      `All Notifications mark as Read User ${userId} ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with mark all Notifications as read for User_Id ${userId} ==> ${err}`
    );
    r.err = e;
  }

  return r;
};

// --------------------------------------------------------------------------------------------

const addImpro = async function (userId, id, productId, improId) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Impro to User ${userId} Improvement_ID ${improId} ...`
  );
  let r = { res: null, err: null };
  const n = new qmModel({ id, pId: productId, qmId: improId });
  const err = n.validateSync();
  if (err) {
    r.err = err;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Adding new  Improvement ${improId} for user ${userId} Error ==> ${err}`
    );
    return r;
  }
  try {
    r.res = await User.updateOne(
      { _id: userId },
      { $push: { improvements: n } }
    );
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Impro Added to User ${userId} Improvement_ID ${improId} ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `error with adding the improvementId ${improId} to userId ${userId} ==>${e}`
    );
    r.err = e;
  }

  return r;
};

// --------------------------------------------------------------------------------------------

const addQuestion = async function (userId, id, productId, quesId) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Question to User ${userId} Question_ID ${quesId} ...`
  );
  let r = { res: null, err: null };
  const n = new qmModel({ id, pId: productId, qmId: quesId });
  const err = n.validateSync();
  if (err) {
    r.err = err;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Adding new  question ${quesId} for user ${userId} Error ==> ${err}`
    );
    return r;
  }
  try {
    r.res = await User.updateOne({ _id: userId }, { $push: { questions: n } });
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Question Added to User ${userId} Question_ID ${quesId} ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `error with adding the question ID ${quesId} to userId ${userId} ==> ${e}`
    );
    r.err = e;
  }

  return r;
};

// --------------------------------------------------------------------------------------------

const addScore = async function (userId, pn, notif) {
  console.log("\x1b[36m%s\x1b[0m", `Adding ${pn} score to user ${userId} ...`);
  let r = { res: null, err: null };
  try {
    const notf = checkNotif(notif);
    r.res = await User.updateOne(
      { _id: userId },
      { $inc: { score: pn }, $push: { notifications: notf } }
    );
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Added ${pn} to score for user ${userId} ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `error with adding ${pn} to user ${userId} ==> ${e}`
    );
    r.err = e;
  }

  return r;
};

const setLastTime = async function (userId) {
  console.log("\x1b[36m%s\x1b[0m", `set last Time User ${userId} ...`);
  let r = { res: null, err: null };
  const time = new Date().toString();
  try {
    r.res = await User.updateOne({ _id: userId }, { lastTime: time });
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Last time ${time} set to User ${userId} ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `error with setting last time to user ${userId} ==> ${e}`
    );
    r.err = e;
  }

  return r;
};

// --------------------------------------------------------------------------------------------

module.exports = {
  findAll,
  findById,
  addnew,
  addnewThird,
  getImprQa,
  findOne,
  addImpro,
  addQuestion,
  addScore,
  addNotif,
  setLastTime,
};

function checkNotif(notif) {
  const notf = new notifModel(notif);
  const err = notf.validateSync();
  if (err) throw err;
  return notf;
}
