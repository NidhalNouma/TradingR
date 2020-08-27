const mongoose = require("mongoose");

const userImpro = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  improId: { type: mongoose.Schema.Types.ObjectId, required: true },
  productTitle: { type: String, required: true },
  productDesc: { type: String, required: true },
  productImg: { type: String, required: true },
  improvement: { type: String, required: true },
  plus: { type: Number, min: 0, default: 0 },
  minus: { type: Number, min: 0, default: 0 },
  answers: { type: Number, default: 0 },
  show: { type: Boolean, default: true },
});

const userQuestion = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  quesId: { type: mongoose.Schema.Types.ObjectId, required: true },
  productTitle: { type: String, required: true },
  productDesc: { type: String, required: true },
  productImg: { type: String, required: true },
  question: { type: String, required: true },
  answers: { type: Number, default: 0 },
  show: { type: Boolean, default: true },
});

const userSchema = new mongoose.Schema({
  joinAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  email: {
    type: String,
    required: [true, "Email is requierd"],
    validate: {
      validator: function (v) {
        return /(\w*\@\w*\.\w*)/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  username: { type: String, required: [true, "username is requierd"] },
  password: { type: String, required: [true, "password is requierd"] },
  userPicture: { type: String },
  improvements: [{ type: userImpro }],
  questions: [{ type: userQuestion }],
  products: [{ type: Object }],
  card: [{ type: Object }],
});

const User = mongoose.model("User", userSchema);
const UserImp = mongoose.model("UserImpro", userImpro);
const UserQue = mongoose.model("UserQuestion", userQuestion);

const addnew = async function (email, username, password) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding New User ${username} with email ${email} ...`
  );
  const user = new User({
    email,
    username,
    password,
  });
  let r = { res: null, err: null, found: true };

  const r0 = await findEmail(email);
  if (r0.res) {
    r.res = "Email already Exist";
    console.log("\x1b[33m%s\x1b[0m", `Email found ==> ${user.email}`);
  } else if (r0.err) {
    r.err = r0.err;
  } else {
    const r1 = await findUserName(username);
    if (r1.res) {
      r.res = "User name already Exist";
      console.log("\x1b[33m%s\x1b[0m", `UserName found ==> ${user.username}`);
    } else if (r1.err) {
      r.err = r1.err;
    } else {
      r.found = false;
      try {
        r.res = await user.save();
      } catch (e) {
        r.err = e;
        console.log("\x1b[31m%s\x1b[0m", `Error with Adding new User ==> ${e}`);
      }
    }
  }

  return r;
};

const findOne = async function (email, password) {
  console.log("\x1b[36m%s\x1b[0m", `Finding User with email ${email} ...`);
  let r = { res: null, err: null };
  try {
    r.res = await User.findOne({ email, password });
  } catch (e) {
    console.log("\x1b[31m%s\x1b[0m", `Error with finding User ==> ${e}`);
    r.err = e;
  }

  return r;
};

const findEmail = async function (email) {
  console.log("\x1b[35m%s\x1b[0m", `Find an Email ${email} ...`);
  const r = {
    res: null,
    err: null,
  };
  try {
    r.res = await User.findOne({ email });
  } catch (e) {
    r.err = e;
    console.log("\x1b[31m%s\x1b[0m", `Error with finding email ==> ${err}`);
  }

  return r;
};

const findUserName = async function (username) {
  console.log("\x1b[36m%s\x1b[0m", `Find a UserName ${username} ...`);
  const r = { res: null, err: null };
  try {
    r.res = await User.findOne({ username });
  } catch (e) {
    r.err = e;
    console.log("\x1b[31m%s\x1b[0m", `Error with finding username ==> ${err}`);
  }

  return r;
};

const findById = async function (_id) {
  console.log("\x1b[36m%s\x1b[0m", `Find user user by ID ${_id} ...`);
  const r = { res: null, err: null };
  try {
    r.res = await User.findOne({ _id });
  } catch (e) {
    r.err = e;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with finding user by ID ${_id}  ==> ${err}`
    );
  }

  return r;
  //     if (user) {
  //       console.log("\x1b[35m%s\x1b[0m", `Found user user by ID ${_id}  ...`);
  //       ans.find = true;
  //       ans.result = user;
  //       callback(ans);
  //     } else {
  //       console.log(
  //         "\x1b[31m%s\x1b[0m",
  //         `User not found with this ID ${_id} ...`
  //       );
  //       ans.result = "User not fund";
};

const getImprQa = async function (_id) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Find Impro & Questions for user ID ${_id} ...`
  );

  const r = { res: null, err: null };
  try {
    r.res = await User.findOne({ _id }).select("_id improvements questions");
  } catch (e) {
    r.err = e;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with finding Impro & Questions for user ID ${_id}  ==> ${err}`
    );
  }

  return r;
};

// --------------------------------------------------------------------------------------------

const addToCard = async function (
  userId,
  productId,
  productTitle,
  productDesc,
  productPrice,
  productImg
) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Product_ID ${productId} to Card for User ${userId} ...`
  );
  const card = {
    productId,
    productTitle,
    productDesc,
    productPrice,
    productImg,
    show: true,
  };

  const r = { res: null, err: null };
  try {
    r.res = await User.updateOne({ _id: userId }, { $push: { card: card } });
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with adding Product_ID ${productId} the card to userId ${userId} ==> ${e}`
    );
    r.err = e;
  }

  return r;
};

// --------------------------------------------------------------------------------------------

const addImpro = async function (
  userId,
  productId,
  improId,
  productTitle,
  productDesc,
  productImg,
  improvement
) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Impro to User ${userId} Improvement_ID ${improId} ...`
  );
  const im = new UserImp({
    productId,
    improId,
    productTitle,
    productDesc,
    productImg,
    improvement,
  });
  let r = { res: null, err: null };
  try {
    r.res = await User.updateOne(
      { _id: userId },
      { $push: { improvements: im } }
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

const improPlus = async function (userId, improId) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Plus to User ${userId} Improvement_ID ${improId} ...`
  );
  let r = { res: null, err: null };
  try {
    r.res = await User.updateOne(
      { _id: userId, "improvements.improId": improId },
      { $inc: { "improvements.$.plus": 1, score: 1 } }
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with adding the impro Plus ${improId} to userId ${userId} ==> ${e}`
    );
    r.err = e;
  }

  return r;
};

const improMinus = async function (userId, improId) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Minus to User ${userId} Improvement_ID ${improId} ...`
  );
  let r = { res: null, err: null };
  try {
    r.res = await User.updateOne(
      { _id: userId, "improvements.improId": improId },
      { $inc: { "improvements.$.minus": 1, score: -1 } }
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with adding the impro Minus ${improId} to userId ${userId} ==>${e}`
    );
    r.err = e;
  }

  return r;
};

// --------------------------------------------------------------------------------------------

const addQuestion = async function (
  userId,
  productId,
  quesId,
  productTitle,
  productDesc,
  productImg,
  question
) {
  const qe = new UserQue({
    productId,
    quesId,
    productTitle,
    productDesc,
    productImg,
    question,
  });
  let r = { res: null, err: null };
  try {
    r.res = await User.updateOne({ _id: userId }, { $push: { questions: qe } });
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `error with adding the question ID ${quesId} to userId ${userId}`
    );
    r.err = e;
  }

  return r;
};

// --------------------------------------------------------------------------------------------

const addToProduct = async function (
  userId,
  productId,
  productType,
  productTitle,
  productDesc,
  productPrice,
  productImg
) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Product_ID ${productId} to User_ID ${userId} ...`
  );
  const p = {
    productId,
    productType,
    productTitle,
    productDesc,
    productPrice,
    productImg,
    show: true,
  };
  let r = { res: null, err: null };

  try {
    r.res = await User.updateOne({ _id: userId }, { $push: { products: p } });
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with adding the Product_ID ${productId} to User_Id ${userId} ==> ${err}`
    );
    r.err = e;
  }

  return r;
};

module.exports = {
  userSchema,
  findById,
  addnew,
  getImprQa,
  findOne,
  addToCard,
  addToProduct,
  addImpro,
  improPlus,
  improMinus,
  addQuestion,
};
