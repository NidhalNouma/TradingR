const mongoose = require("mongoose");
const user = require("../Model/user");
const { productSchema } = require("./product");

const answerSchema = new mongoose.Schema({
  imprId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
  userName: { type: String, required: true },
  userImg: { type: String },
  answer: { type: String, required: [true, "Question is requierd"] },
  timestamp: { type: Date, default: Date.now },
});

const improSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  productId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userImg: { type: String },
  improvement: { type: String, required: [true, "Improvement is requierd"] },
  plus: [{ type: mongoose.Types.ObjectId }],
  minus: [{ type: mongoose.Types.ObjectId }],
  answers: { type: [answerSchema] },
});

const Impro = mongoose.model("Impro", improSchema);
const Answer = mongoose.model("Answer", answerSchema);

const addImpro = function (_id, userId, userName, userImg, impro, callback) {
  const product = mongoose.model("Product", productSchema);

  const ans = {
    added: false,
    error: null,
  };

  const iid = mongoose.Types.ObjectId();

  const imp = new Impro({
    _id: iid,
    productId: _id,
    userId,
    userName,
    userImg,
    improvement: impro,
  });

  product.findOneAndUpdate({ _id }, { $push: { improvements: imp } }, function (
    err,
    raw
  ) {
    if (err) {
      console.log(
        "Add new improvement Product with ID" + _id + " Error ...",
        err
      );
      ans.error = err;
      callback(ans);
    } else {
      console.log(raw.improvements);
      console.log(iid);
      user.addImpro(
        userId,
        _id,
        iid,
        raw.title,
        raw.description,
        raw.img,
        impro,
        function (res) {
          if (res.added) {
            ans.added = true;
            callback(ans);
          }
        }
      );
    }
  });
};

const addImproAns = function (id, userId, userName, userImg, answer, callback) {
  const product = mongoose.model("Product", productSchema);

  const ans = {
    added: false,
    error: null,
  };

  const answ = new Answer({ improId: id, userId, userName, userImg, answer });

  product.updateOne(
    { improvements: { $elemMatch: { _id: id } } },
    { $push: { "improvements.$.answers": answ } },
    function (err) {
      if (err) {
        console.log(
          "Add new Ansower to Impro with ID" + id + " Error ...",
          err
        );
        ans.error = err;
        callback(ans);
      } else {
        ans.added = true;
        callback(ans);
      }
    }
  );
};

const improPlus = function (_id, id, userId, callback) {
  const product = mongoose.model("Product", productSchema);

  const ans = {
    added: false,
    error: null,
  };

  product.findOneAndUpdate(
    { _id, improvements: { $elemMatch: { _id: id } } },
    { $push: { "improvements.$.plus": userId } },
    function (err, raw) {
      if (err) {
        console.log("Add new Plus to Impro with ID" + id + " Error ...", err);
        ans.error = err;
        callback(ans);
      } else {
        user.improPlus(userId, id, function (res) {
          if (res.added) {
            ans.added = true;
            callback(ans);
          }
        });
      }
    }
  );
};

const improMin = function (id, userId, callback) {
  const product = mongoose.model("Product", productSchema);

  const ans = {
    added: false,
    error: null,
  };

  product.updateOne(
    { improvements: { $elemMatch: { _id: id } } },
    { $push: { "improvements.$.minus": userId } },
    function (err) {
      if (err) {
        console.log("Add new minus to Impro with ID" + id + " Error ...", err);
        ans.error = err;
        callback(ans);
      } else {
        user.improMinus(userId, id, function (res) {
          if (res.added) {
            ans.added = true;
            callback(ans);
          }
        });
      }
    }
  );
};

module.exports = {
  improSchema,
  addImpro,
  improPlus,
  improMin,
  addImproAns,
};
