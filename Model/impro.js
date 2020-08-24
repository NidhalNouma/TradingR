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
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding new improvement for product ID ${_id} userID ${userId} ...`
  );
  const product = mongoose.model("Product", productSchema);

  const ans = {
    added: false,
    improId: null,
    error: null,
  };
  const id = mongoose.Types.ObjectId();

  const imp = new Impro({
    _id: id,
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
        "\x1b[31m%s\x1b[0m",
        `"Add new improvement Product with ID ${_id} Error ==> ${err}`
      );
      ans.error = err;
      callback(ans);
    } else {
      console.log(
        "\x1b[35m%s\x1b[0m",
        `"New Improvement Added for Product with ID ${_id} ... `
      );
      user.addImpro(
        userId,
        _id,
        id,
        raw.title,
        raw.description,
        raw.img,
        impro,
        function (res) {
          if (res.added) {
            ans.added = true;
            ans.improId = id;
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
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Plus to improvementID ${id} for product ID ${_id} userID ${userId} ...`
  );

  const product = mongoose.model("Product", productSchema);

  const ans = {
    added: false,
    error: null,
  };

  product.findOneAndUpdate(
    { _id, "improvements._id": id },
    { $push: { "improvements.$.plus": userId } },
    function (err, raw) {
      if (err) {
        console.log(
          "\x1b[31m%s\x1b[0m",
          `"Add new Plus to Impro with ID ${id} Error ==> ${err}`
        );
        ans.error = err;
        callback(ans);
      } else if (raw) {
        console.log(
          "\x1b[35m%s\x1b[0m",
          `Plus Added to improvementID ${id} for product ID ${_id} userID ${userId} ...`
        );
        const iid = raw.improvements.find((i) => i._id == id);
        user.improPlus(userId, raw.improvements.indexOf(iid), function (res) {
          if (res.added) {
            ans.added = true;
            callback(ans);
          } else {
            callback(res.ans);
          }
        });
      } else {
        console.log("\x1b[33m%s\x1b[0m", `"Not found Impro with ID ${id} ...`);
        ans.error = "no impro with this ID ";
        callback(ans);
      }
    }
  );
};

const improMin = function (_id, id, userId, callback) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Minus to improvementID ${id} for product ID ${_id} userID ${userId} ...`
  );
  const product = mongoose.model("Product", productSchema);

  const ans = {
    added: false,
    error: null,
  };

  product.updateOne(
    { _id, improvements: { $elemMatch: { _id: id } } },
    { $push: { "improvements.$.minus": userId } },
    function (err, raw) {
      if (err) {
        console.log(
          "\x1b[31m%s\x1b[0m",
          `Add new minus to Impro with ID ${id} Error ==> ${err}`
        );
        ans.error = err;
        callback(ans);
      } else if (raw) {
        console.log(
          "\x1b[35m%s\x1b[0m",
          `Minus Added to improvementID ${id} for product ID ${_id} userID ${userId} ...`
        );
        const iid = raw.improvements.find((i) => i._id == id);
        user.improMinus(userId, raw.improvements.indexOf(iid), function (res) {
          if (res.added) {
            ans.added = true;
            callback(ans);
          } else {
            callback(res.ans);
          }
        });
      } else {
        console.log("\x1b[33m%s\x1b[0m", `"Not found Impro with ID ${id} ...`);
        ans.error = "no impro with this ID ";
        callback(ans);
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
