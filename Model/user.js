const mongoose = require("mongoose");
const Stripe = require("stripe");
require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SEC_KEY);

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
  firstName: { type: String, required: [true, "First name is requierd"] },
  lastName: { type: String, required: [true, "Last name is requierd"] },
  password: { type: String, required: [true, "password is requierd"] },
  forgetPassword: {
    token: { type: String, default: null },
    updateAt: { type: Date, default: Date.now },
  },
  userPicture: { type: String, default: "noimg" },
  improvements: [qmSchema],
  questions: [qmSchema],
  posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
  notifications: [notifSchema],
  subscribers: [{ type: mongoose.Types.ObjectId, ref: "ProductVersion" }],
  subscription: { type: String },
  sub: [],
  paymentMethod: [],
  customerId: { type: String },
  show: { type: Boolean, default: true },
});

userSchema.post("findOne", async function (doc) {
  if (doc && doc.customerId) {
    let sub = null;
    try {
      sub = await stripe.customers.retrieve(doc.customerId);
    } catch (err) {
      console.log(
        "\x1b[31m%s\x1b[0m",
        `Error with Finding subscription ==> ${err}`
      );
    }
    if (sub && sub.subscriptions) {
      const { data } = sub.subscriptions;
      if (data.length > 0) {
        let r = [];
        data.forEach(function (i) {
          const pr = process.env;
          let price = null;
          for (v in pr) {
            if (pr[v] === i.plan.id) price = v;
          }
          r.push({
            subId: i.id,
            price,
            id: i.plan.id,
            interval: i.plan.interval,
            // sub,
            cycle: i.billing_cycle_anchor,
            start: i.current_period_start,
            end: i.current_period_end,
          });
        });
        doc["sub"] = r;
      }
    }
    try {
      const paym = await stripe.paymentMethods.list({
        customer: doc.customerId,
        type: "card",
      });
      doc["paymentMethod"] = paym.data;
    } catch (err) {
      console.log(
        "\x1b[31m%s\x1b[0m",
        `Error with Finding Payment methods ==> ${err}`
      );
    }
  }
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

const addnew = async function (email, firstName, lastName, password) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding New User ${firstName} ${lastName} with email ${email} ...`
  );
  let r = { res: null, err: null, found: true };
  const user = new User({
    email,
    firstName,
    lastName,
    userName: firstName + lastName,
    password,
  });

  const er = user.validateSync();
  if (er) {
    r.err = er.message;
    console.log("\x1b[31m%s\x1b[0m", `Error with Validate new User ==> ${er}`);
    return r;
  }

  try {
    const customer = await stripe.customers.create({ email });
    user.customerId = customer.id;
    r.res = await user.save();
    r.found = false;
    console.log("\x1b[35m%s\x1b[0m", `User saved ${firstName} ${lastName} ...`);
  } catch (e) {
    r.err = e.message;
    console.log("\x1b[31m%s\x1b[0m", `Error with Adding new User ==> ${e}`);
  }

  return r;
};

const addnewThird = async function (
  email,
  firstName,
  lastName,
  password,
  from,
  userPicture
) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding New User ${firstName} ${lastName} with email ${email} ...`
  );
  const user = new User({
    email,
    firstName,
    lastName,
    userName: firstName + lastName,
    password,
    from,
    userPicture,
    active: true,
  });

  let r = { res: null, err: null, found: true };
  try {
    const customer = await stripe.customers.create({ email });
    user.customerId = customer.id;
    r.res = await user.save();
    r.found = false;
  } catch (e) {
    r.err = e;
    console.log("\x1b[31m%s\x1b[0m", `Error with Adding new User ==> ${e}`);
  }

  return r;
};

const findOne = async function (email, password, third = false) {
  console.log("\x1b[36m%s\x1b[0m", `Finding User with email ${email} ...`);
  const flt = third ? { email } : { email, password };
  let r = { res: null, err: null };
  try {
    r.res = await User.findOne(flt)
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
      })
      .populate({
        path: "notifications.fromId",
        select: "userName _id userPicture",
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

const findByUserName = async function (userName) {
  console.log("\x1b[36m%s\x1b[0m", `Find User by userName ${userName} ...`);
  const r = { res: null, err: null };
  try {
    r.res = await User.findOne({ userName }).select(
      "-notifications -customerId -email -lastTime -password -show -improvements -questions"
    );
    console.log("\x1b[35m%s\x1b[0m", `Find User by userName ==> ${userName}`);
  } catch (e) {
    r.err = e;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with finding user by userName ${userName}  ==> ${e}`
    );
  }

  return r;
};

const updateUser = async function (
  _id,
  userName,
  firstName,
  lastName,
  userPicture
) {
  console.log("\x1b[36m%s\x1b[0m", `Update User ${_id} ...`);
  const r = { res: null, err: null };
  try {
    r.res = await User.updateOne(
      { _id },
      { userName, firstName, lastName, userPicture }
    );
    console.log("\x1b[35m%s\x1b[0m", `User Updated ==> ${_id}`);
  } catch (e) {
    r.err = e;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with Updating User ${_id}  ==> ${e}`
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
      { $set: { "notifications.$.read": true } }
    );
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Notification ${_id} mark as Read User ${userId} ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with mark Notification as read for User_Id ${userId} ==> ${e}`
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
      { "notifications.$[].read": true }
    );
    console.log(
      "\x1b[35m%s\x1b[0m",
      `All Notifications mark as Read User ${userId} ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with mark all Notifications as read for User_Id ${userId} ==> ${e}`
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

const setCustomerId = async function (userId, id) {
  console.log("\x1b[36m%s\x1b[0m", `set CustomerId to User ${userId} ...`);
  let r = { res: null, err: null };
  try {
    r.res = await User.updateOne({ _id: userId }, { customerId: id });
    console.log(
      "\x1b[35m%s\x1b[0m",
      `CustomerId ${id} set to User ${userId} ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `error with setting customerId to user ${userId} ==> ${e}`
    );
    r.err = e;
  }

  return r;
};

const setSubscription = async function (userId, subs) {
  console.log("\x1b[36m%s\x1b[0m", `set Subscription to User ${userId} ...`);
  let r = { res: null, err: null };
  try {
    r.res = await User.updateOne({ _id: userId }, { subscription: subs });
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Subscription ${subs} set to User ${userId} ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `error with setting Subscription to user ${userId} ==> ${e}`
    );
    r.err = e;
  }

  return r;
};

// --------------------------------------------------------------------------------------------

module.exports = {
  findAll,
  findById,
  findByUserName,
  addnew,
  addnewThird,
  updateUser,
  getImprQa,
  findOne,
  addImpro,
  addQuestion,
  addScore,
  addNotif,
  markNotifAsRead,
  markAllNotifAsRead,
  setLastTime,
  setSubscription,
  setCustomerId,
};

function checkNotif(notif) {
  const notf = new notifModel(notif);
  const err = notf.validateSync();
  if (err) throw err;
  return notf;
}
