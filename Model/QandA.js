const mongoose = require("mongoose");
const user = require("../Model/user");
const { productSchema } = require("./product");

const answerSchema = new mongoose.Schema({
  qandaId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
  userName: { type: String, required: [true, "UserName is requierd"] },
  userImg: { type: String, required: true },
  answer: { type: String, required: [true, "Question is requierd"] },
  timestamp: { type: Date, default: Date.now },
});

const qaSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  productId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true },
  userName: { type: String, required: [true, "UserName is requierd"] },
  userImg: { type: String, required: true },
  question: { type: String, required: [true, "Question is requierd"] },
  answers: { type: [answerSchema] },
});

const qaModel = mongoose.model("Qanda", qaSchema);

const addQuestion = function (
  _id,
  userId,
  userName,
  userImg,
  question,
  callback
) {
  const product = mongoose.model("Product", productSchema);

  const ans = {
    added: false,
    error: null,
  };

  const quest = new qaModel({
    productId: _id,
    userId,
    userName,
    userImg,
    question,
  });

  product.findOneAndUpdate({ _id }, { $push: { qandas: quest } }, function (
    err,
    raw
  ) {
    if (err) {
      console.log("Add new question Product with ID" + _id + " Error ...", err);
      ans.error = err;
      callback(ans);
    } else {
      user.addQuestion(
        userId,
        _id,
        raw._id,
        raw.title,
        raw.description,
        raw.img,
        question,
        function (res) {
          if (res.added) {
            console.log(res);
            ans.added = true;
            callback(ans);
          }
        }
      );
    }
  });
};

const addQuestionAns = function (
  id,
  userId,
  userName,
  userImg,
  answer,
  callback
) {
  const product = mongoose.model("Product", productSchema);
  const Answer = mongoose.model("Answerqa", answerSchema);

  const ans = {
    added: false,
    error: null,
  };

  const answ = new Answer({ qandas: id, userId, userName, userImg, answer });

  product.updateOne(
    { qandas: { $elemMatch: { _id: id } } },
    { $push: { "qandas.$.answers": answ } },
    function (err) {
      if (err) {
        console.log(
          "Add new Ansower to question with ID" + id + " Error ...",
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

module.exports = { qaSchema, addQuestion, addQuestionAns };
