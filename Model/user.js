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
  improvements: [{ type: mongoose.Schema.Types.ObjectId }],
  questions: [{ type: mongoose.Schema.Types.ObjectId }],
  products: [{ type: mongoose.Schema.Types.ObjectId }],
  card: [{ type: mongoose.Schema.Types.ObjectId }],
});

const User = mongoose.model("User", userSchema);

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
          user.save(function (err) {
            if (!err) {
              console.log("User saved ...");
              ans.add = true;
              ans.results = {
                username,
                email,
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

module.exports = {
  userSchema,
  addnew,
  findOne,
};
