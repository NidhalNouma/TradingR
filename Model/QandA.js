const mongoose = require("mongoose");
const { productSchema } = require("./product");

const answerSchema = new mongoose.Schema({
  qandaId: { type: mongoose.Types.ObjectId, required: true },
  userName: { type: String, required: [true, "UserName is requierd"] },
  answer: { type: String, required: [true, "Question is requierd"] },
  timestamp: { type: Date, default: Date.now },
});

const qaSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  productId: { type: mongoose.Types.ObjectId, required: true },
  question: { type: String, required: [true, "Question is requierd"] },
  answers: { type: [answerSchema] },
});

const qaModel = mongoose.model("Qanda", qaSchema);

const addQuestion = function (_id, question, callback) {
  const product = mongoose.model("Product", productSchema);

  const ans = {
    added: false,
    error: null,
  };

  const quest = new qaModel({ productId: _id, question });

  product.updateOne({ _id }, { $push: { qandas: quest } }, function (err) {
    if (err) {
      console.log("Add new question Product with ID" + _id + " Error ...", err);
      ans.error = err;
      callback(ans);
    } else {
      ans.added = true;
      callback(ans);
    }
  });
};

const addQuestionAns = function (id, userName, answer, callback) {
  const product = mongoose.model("Product", productSchema);
  const Answer = mongoose.model("Answerqa", answerSchema);

  const ans = {
    added: false,
    error: null,
  };

  const answ = new Answer({ qandas: id, userName, answer });

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
