const mongoose = require("mongoose");

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
  improvements: [{ type: Object }],
  questions: [{ type: Object }],
  products: [{ type: Object }],
  card: [{ type: Object }],
});

const User = mongoose.model("User", userSchema);

const addnew = function (email, username, password, callback) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding New User ${username} with email ${email} ...`
  );

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
              console.log("\x1b[35m%s\x1b[0m", "User saved ...");
              ans.add = true;
              ans.results = {
                _id: res._id,
                username: res.username,
                email: res.email,
                score: res.score,
                // improvements: res.improvements,
                // questions: res.questions,
                // products: res.products,
                // card: res.card,
                joinAt: res.joinAt,
                active: res.active,
              };
              callback(ans);
            } else {
              console.log(
                "\x1b[31m%s\x1b[0m",
                `Error with Adding new User ==> ${err}`
              );
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
  console.log("\x1b[36m%s\x1b[0m", `Finding User with email ${email} ...`);
  const ans = {
    findUser: false,
    results: {},
    errors: {},
  };

  User.findOne({ email, password }, function (err, user) {
    if (err) {
      console.log("\x1b[31m%s\x1b[0m", `Error with finding User ==> ${err}`);
      ans.errors = err;
      callback(ans);
    } else {
      if (user) {
        console.log("\x1b[35m%s\x1b[0m", "Find User ==> ", user.username);
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
        console.log(
          "\x1b[31m%s\x1b[0m",
          `Cannot found user with email ${email} ... (email/password Incorrect)`
        );
        callback(ans);
      }
    }
  });
};

const findEmail = function (email, callback) {
  console.log("\x1b[35m%s\x1b[0m", `Find an Email ${email} ...`);
  const ans = {
    emailExist: false,
    message: "",
    errors: {},
  };
  User.findOne({ email }, function (err, user) {
    if (err) {
      console.log("\x1b[31m%s\x1b[0m", `Error with finding email ==> ${err}`);
      ans.errors = err;
      callback(ans);
    } else {
      if (user) {
        console.log("Email found ==> ", user.email);
        ans.emailExist = true;
        ans.message = "Email already Exist";
        callback(ans);
      } else {
        console.log("Email not found ... ");
        ans.message = "Email not found";
        callback(ans);
      }
    }
  });
};

const findUserName = function (username, callback) {
  console.log("\x1b[36m%s\x1b[0m", `Find a UserName ${username} ...`);
  const ans = {
    userExist: false,
    message: "",
    errors: {},
  };
  User.findOne({ username }, function (err, user) {
    if (err) {
      console.log(
        "\x1b[31m%s\x1b[0m",
        `Error with finding username ==> ${err}`
      );
      ans.errors = err;
      callback(ans);
    } else {
      if (user) {
        console.log("UserName found ==> ", user.username);
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
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Product_ID ${productId} to Card for User ${userId} ...`
  );
  const ans = {
    added: false,
    error: null,
  };

  const card = {
    productId,
    productTitle,
    productDesc,
    productPrice,
    productImg,
    show: true,
  };

  User.updateOne({ _id: userId }, { $push: { card: card } }, function (
    err,
    res
  ) {
    if (err) {
      console.log(
        "\x1b[31m%s\x1b[0m",
        `Error with adding Product_ID ${productId} the card to userId ${userId} ==> ${err}`
      );
      ans.error = err;
      callback(ans);
    } else {
      console.log(
        "\x1b[35m%s\x1b[0m",
        `Product_ID ${productId} Added To Card For User_ID ${userId} ...`
      );
      ans.added = true;
      callback(ans);
    }
  });
};

// --------------------------------------------------------------------------------------------

const addImpro = function (
  userId,
  productId,
  improId,
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

  const im = {
    productId,
    improId,
    productTitle,
    productDesc,
    productImg,
    improvement,
  };

  User.updateOne({ _id: userId }, { $push: { improvements: im } }, function (
    err,
    res
  ) {
    if (err) {
      console.log(
        "\x1b[31m%s\x1b[0m",
        `error with adding the improvement ${improvement} to userId ${userId} ==>${err}`
      );
      ans.error = err;
      callback(ans);
    } else {
      ans.added = true;
      callback(ans);
    }
  });
};

const improPlus = function (userId, improId, callback) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Plus to User ${userId} Improvement_Index ${improId} ...`
  );
  const ans = {
    added: false,
    error: null,
  };
  User.updateOne(
    { _id: userId, improvements: { $elemMatch: { improId: improId } } },
    { $inc: { "improvements.$.plus": 1 } },
    function (err, res) {
      if (err) {
        console.log(
          "\x1b[31m%s\x1b[0m",
          `Error with adding the impro Plus ${improId} to userId ${userId} ==> ${err}`
        );
        ans.error = err;
        callback(ans);
      } else {
        console.log(
          "\x1b[35m%s\x1b[0m",
          `Plus Added to User ${userId} Improvement_Index ${improId} ...`
        );
        ans.added = true;
        callback(ans);
      }
    }
  );
};

const improMinus = function (userId, improId, callback) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Minus to User ${userId} Improvement_Index ${improId} ...`
  );
  const ans = {
    added: false,
    error: null,
  };
  User.updateOne(
    { _id: userId, improvements: { $elemMatch: { improId: improId } } },
    { $inc: { "improvements.$.minus": 1 } },
    function (err, res) {
      if (err) {
        console.log(
          "\x1b[31m%s\x1b[0m",
          `Error with adding the impro Minus ${improId} to userId ${userId} ==>${err}`
        );
        ans.error = err;
        callback(ans);
      } else {
        console.log(
          "\x1b[35m%s\x1b[0m",
          `Minus Added to User ${userId} Improvement_Index ${improId} ...`
        );
        ans.added = true;
        callback(ans);
      }
    }
  );
};

// --------------------------------------------------------------------------------------------

const addQuestion = function (
  userId,
  productId,
  quesId,
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

  const qe = {
    productId,
    quesId,
    productTitle,
    productDesc,
    productImg,
    question,
  };

  User.updateOne({ _id: userId }, { $push: { questions: qe } }, function (
    err,
    res
  ) {
    if (err) {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "error with adding the question to userId",
        userId,
        question
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
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Product_ID ${productId} to User_ID ${userId} ...`
  );
  const ans = {
    added: false,
    error: null,
  };

  const p = {
    productId,
    productType,
    productTitle,
    productDesc,
    productPrice,
    productImg,
    show: true,
  };

  User.updateOne({ _id: userId }, { $push: { products: p } }, function (
    err,
    res
  ) {
    if (err) {
      console.log(
        "\x1b[31m%s\x1b[0m",
        `Error with adding the Product_ID ${productId} to User_Id ${userId} ==> ${err}`
      );
      ans.error = err;
      callback(ans);
    } else {
      console.log(
        "\x1b[35m%s\x1b[0m",
        `Product_ID ${productId} Added to User_ID ${userId} ...`
      );
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
  improPlus,
  improMinus,
  addQuestion,
};
