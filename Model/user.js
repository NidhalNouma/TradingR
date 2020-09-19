const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  joinAt: { type: Date, default: Date.now },
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
  username: {
    type: String,
    required: [true, "username is requierd"],
    unique: [true, "username exist"],
  },
  password: { type: String, required: [true, "password is requierd"] },
  userPicture: { type: String, default: "noimg" },
  improvements: [
    {
      pId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      impId: { type: mongoose.Schema.Types.ObjectId },
    },
  ],
  questions: [
    {
      pId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quesId: { type: mongoose.Schema.Types.ObjectId },
    },
  ],
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  notifications: [
    {
      message: {
        type: String,
        required: true,
      },
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    },
  ],
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const User = mongoose.model("User", userSchema);

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
  try {
    r.res = await user.save();
    r.found = false;
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
    r.res = await User.findOne({ email, password }).select(
      "-improvements -questions"
    );
  } catch (e) {
    console.log("\x1b[31m%s\x1b[0m", `Error with finding User ==> ${e}`);
    r.err = e;
  }

  return r;
};

const findById = async function (_id) {
  console.log("\x1b[36m%s\x1b[0m", `Find user user by ID ${_id} ...`);
  const r = { res: null, err: null };
  try {
    r.res = await User.findOne({ _id }).select("-improvements -questions");
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
    r.res = await User.findOne({ _id })
      .populate({
        path: "improvements.pId",
        select: "improvements img  title timestamp ",
      })
      .populate({
        path: "questions.pId",
        select: "qandas img  title timestamp ",
      })
      .select("_id improvements questions");
  } catch (e) {
    r.err = e;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with finding Impro & Questions for user ID ${_id}  ==> ${e}`
    );
  }

  return r;
};

const getUserCard = async function (userId) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Finding Cards items for User_ID ${userId} ...`
  );
  let r = { res: null, err: null };
  try {
    r.res = await User.findById(userId).populate({
      path: "card",
      select: "_id title description",
    });
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with Finding the Cards items for User_Id ${userId} ==> ${err}`
    );
    r.err = e;
  }

  return r;
};

// --------------------------------------------------------------------------------------------

const addToCard = async function (userId, productId) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Product_ID ${productId} to Card for User ${userId} ...`
  );

  const r = { res: null, err: null };
  try {
    r.res = await User.updateOne(
      { _id: userId },
      { $push: { card: productId } }
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with adding Product_ID ${productId} the card to userId ${userId} ==> ${e}`
    );
    r.err = e;
  }

  return r;
};

const addToProduct = async function (userId, productId) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Product_ID ${productId} to User_ID ${userId} ...`
  );
  let r = { res: null, err: null };

  try {
    r.res = await User.updateOne(
      { _id: userId },
      { $push: { products: productId } }
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with adding the Product_ID ${productId} to User_Id ${userId} ==> ${err}`
    );
    r.err = e;
  }

  return r;
};

// --------------------------------------------------------------------------------------------

const addImpro = async function (userId, productId, improId) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Impro to User ${userId} Improvement_ID ${improId} ...`
  );
  let r = { res: null, err: null };
  try {
    r.res = await User.updateOne(
      { _id: userId },
      { $push: { improvements: { pId: productId, impId: improId } } }
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

const addQuestion = async function (userId, productId, quesId) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Question to User ${userId} Question_ID ${quesId} ...`
  );
  let r = { res: null, err: null };
  try {
    r.res = await User.updateOne(
      { _id: userId },
      { $push: { questions: { pId: productId, quesId } } }
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

const addScore = async function (userId, pn) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding ${pn} score to userID ${userId} ...`
  );
  let r = { res: null, err: null };
  try {
    r.res = await User.updateOne({ _id: userId }, { $inc: { score: pn } });
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `error with adding ${pn} to userID ${userId} ==> ${e}`
    );
    r.err = e;
  }

  return r;
};

// --------------------------------------------------------------------------------------------

module.exports = {
  userSchema,
  findById,
  addnew,
  addnewThird,
  getImprQa,
  getUserCard,
  findOne,
  addToCard,
  addToProduct,
  addImpro,
  addQuestion,
  addScore,
};
