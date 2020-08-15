const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  productTitle: { type: String, required: true },
  productDesc: { type: String, required: true },
  productPrice: { type: String, required: true },
  productImg: { type: String, required: true },
  show: { type: Boolean, default: true },
});

const pSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  productType: { type: String, required: true },
  productTitle: { type: String, required: true },
  productDesc: { type: String, required: true },
  productPrice: { type: String, required: true },
  productImg: { type: String, required: true },
  show: { type: Boolean, default: true },
});

const userImpro = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  productTitle: { type: String, required: true },
  productDesc: { type: String, required: true },
  productImg: { type: String, required: true },
  improvement: { type: String, required: true },
  show: { type: Boolean, default: true },
});

const userQuestion = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
  productTitle: { type: String, required: true },
  productDesc: { type: String, required: true },
  productImg: { type: String, required: true },
  question: { type: String, required: true },
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
  improvements: [{ type: mongoose.Schema.Types.ObjectId }],
  questions: [{ type: mongoose.Schema.Types.ObjectId }],
  products: [{ type: pSchema }],
  card: [{ type: cardSchema }],
});

const User = mongoose.model("User", userSchema);
const Card = mongoose.model("Card", cardSchema);
const P = mongoose.model("Puser", pSchema);
const impro = mongoose.model("UsrImpro", userImpro);
const ques = mongoose.model("UsrQuestion", userQuestion);

const addnew = function (email, username, password, callback) {
  const user = new User({
    email,
    username,
    password,
  });

  const ans = {
    add: false,
    results: {},
    errors: {},
  };

  findEmail(email, function (res) {
    if (!res.emailExist) {
      findUserName(username, function (ress) {
        if (!ress.userExist) {
          user.save(function (err, res) {
            if (!err) {
              console.log("User saved ...");
              ans.add = true;
              ans.results = {
                _id: res._id,
                username: res.username,
                email: res.email,
                score: res.score,
                improvements: res.improvements,
                questions: res.questions,
                products: res.products,
                card: res.card,
                joinAt: res.joinAt,
                active: res.active,
              };
              callback(ans);
            } else {
              console.log("Error with saving new User ...", err);
              ans.errors = err;
              callback(ans);
            }
          });
        } else {
          ans.errors = {
            message: ress.message,
            error: ress.errors,
          };
          callback(ans);
        }
      });
    } else {
      ans.errors = {
        message: res.message,
        error: res.errors,
      };
      callback(ans);
    }
  });
};

const findOne = function (email, password, callback) {
  const ans = {
    findUser: false,
    results: {},
    errors: {},
  };

  User.findOne({ email, password }, function (err, user) {
    if (err) {
      console.log("Error with finding User ...", err);
      ans.errors = err;
      callback(ans);
    } else {
      if (user) {
        console.log("find user ...", user.username);
        ans.results = {
          id: user._id,
          active: user.active,
          username: user.username,
          email: user.email,
          score: user.score,
          improvements: user.improvements,
          questions: user.questions,
          products: user.products,
          card: user.card,
          joinAt: user.joinAt,
        };
        ans.findUser = true;
        callback(ans);
      } else {
        console.log("cannot found user ... (username/password Incorrect)");
        callback(ans);
      }
    }
  });
};

const findEmail = function (email, callback) {
  const ans = {
    emailExist: false,
    message: "",
    errors: {},
  };
  User.findOne({ email }, function (err, user) {
    if (err) {
      console.log("Error with finding email ...", err);
      ans.errors = err;
      callback(ans);
    } else {
      if (user) {
        console.log("Email found ...", user.email);
        ans.emailExist = true;
        ans.message = "Email already Exist";
        callback(ans);
      } else {
        console.log("Email not found ...");
        ans.message = "Email not found";
        callback(ans);
      }
    }
  });
};

const findUserName = function (username, callback) {
  const ans = {
    userExist: false,
    message: "",
    errors: {},
  };
  User.findOne({ username }, function (err, user) {
    if (err) {
      console.log("Error with finding username ...", err);
      ans.errors = err;
      callback(ans);
    } else {
      if (user) {
        console.log("UserName found ...", user.username);
        ans.userExist = true;
        ans.message = "User name Already Exist";
        callback(ans);
      } else {
        console.log("UserName not found ...");
        ans.message = "User name not fund";
        callback(ans);
      }
    }
  });
};

// --------------------------------------------------------------------------------------------

const addToCard = function (
  userId,
  productId,
  productTitle,
  productDesc,
  productPrice,
  productImg,
  callback
) {
  const ans = {
    added: false,
    error: null,
  };

  const card = new Card({
    productId,
    productTitle,
    productDesc,
    productPrice,
    productImg,
    show: true,
  });

  User.updateOne({ _id: userId }, { $push: { card: card } }, function (
    err,
    res
  ) {
    if (err) {
      console.log("error with adding the card to userId", userId, productId);
      ans.error = err;
      callback(ans);
    } else {
      ans.added = true;
      callback(ans);
    }
  });
};

// --------------------------------------------------------------------------------------------

const addImpro = function (
  userId,
  productId,
  productTitle,
  productDesc,
  productImg,
  improvement,
  callback
) {
  const ans = {
    added: false,
    error: null,
  };

  const im = new impro({
    productId,
    productTitle,
    productDesc,
    productImg,
    improvement,
  });

  User.updateOne({ _id: userId }, { $push: { improvements: im } }, function (
    err,
    res
  ) {
    if (err) {
      console.log(
        "error with adding the improvement to userId",
        userId,
        improvement
      );
      ans.error = err;
      callback(ans);
    } else {
      ans.added = true;
      callback(ans);
    }
  });
};

// --------------------------------------------------------------------------------------------

const addQuestion = function (
  userId,
  productId,
  productTitle,
  productDesc,
  productImg,
  question,
  callback
) {
  const ans = {
    added: false,
    error: null,
  };

  const qe = new ques({
    productId,
    productTitle,
    productDesc,
    productImg,
    question,
  });

  User.updateOne({ _id: userId }, { $push: { questions: qe } }, function (
    err,
    res
  ) {
    if (err) {
      console.log("error with adding the question to userId", userId, question);
      ans.error = err;
      callback(ans);
    } else {
      ans.added = true;
      callback(ans);
    }
  });
};

// --------------------------------------------------------------------------------------------

const addToProduct = function (
  userId,
  productId,
  productType,
  productTitle,
  productDesc,
  productPrice,
  productImg,
  callback
) {
  const ans = {
    added: false,
    error: null,
  };

  const p = new P({
    productId,
    productType,
    productTitle,
    productDesc,
    productPrice,
    productImg,
    show: true,
  });

  User.updateOne({ _id: userId }, { $push: { products: p } }, function (
    err,
    res
  ) {
    if (err) {
      console.log("error with adding the product to userId", userId, productId);
      ans.error = err;
      callback(ans);
    } else {
      ans.added = true;
      callback(ans);
    }
  });
};

module.exports = {
  userSchema,
  addnew,
  findOne,
  addToCard,
  addToProduct,
  addImpro,
  addQuestion,
};
