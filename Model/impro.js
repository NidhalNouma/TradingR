const mongoose = require("mongoose");
const { productSchema } = require("./product");

const answerSchema = new mongoose.Schema({
  imprId: { type: mongoose.Types.ObjectId, required: true },
  userName: { type: String, required: [true, "UserName is requierd"] },
  answer: { type: String, required: [true, "Question is requierd"] },
  timestamp: { type: Date, default: Date.now },
});

const improSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  productId: { type: mongoose.Types.ObjectId, required: true },
  improvement: { type: String, required: [true, "Improvement is requierd"] },
  plus: { type: Number, min: 0, default: 0 },
  minus: { type: Number, min: 0, default: 0 },
  answers: { type: [answerSchema] },
});

const Impro = mongoose.model("Impro", improSchema);
const Answer = mongoose.model("Answer", answerSchema);

const addImpro = function (_id, impro, callback) {
  const product = mongoose.model("Product", productSchema);

  const ans = {
    added: false,
    error: null,
  };

  const imp = new Impro({ productId: _id, improvement: impro });

  product.updateOne({ _id }, { $push: { improvements: imp } }, function (err) {
    if (err) {
      console.log(
        "Add new improvement Product with ID" + _id + " Error ...",
        err
      );
      ans.error = err;
      callback(ans);
    } else {
      // imp.save(function (err) {
      //   if (err) {
      //     console.log("New Improvement Error with save ...", err);
      //     ans.error = err;
      //     callback(ans);
      //   } else {
      ans.added = true;
      callback(ans);
      //   }
      // });
    }
  });
};

const addImproAns = function (id, userName, answer, callback) {
  const product = mongoose.model("Product", productSchema);

  const ans = {
    added: false,
    error: null,
  };

  const answ = new Answer({ improId: id, userName, answer });

  // Impro.updateOne({ _id: id }, { $push: { answers: answ } }, function (err) {
  //   if (err) {
  //     console.log("Add new Ansower to Impro with ID" + id + " Error ...", err);
  //     ans.error = err;
  //     callback(ans);
  //   } else {
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
  //   }
  // });
};

const findProdByImproId = function (id, callback) {
  const product = mongoose.model("Product", productSchema);

  const ans = {
    find: false,
    error: null,
    result: null,
  };

  product.findOne({ "improvements._id": id }, function (err, res) {
    if (err) {
      ans.error = err;
      callback(ans);
    } else {
      ans.find = true;
      ans.result = res;
      callback(ans);
    }
  });
};

module.exports = { improSchema, addImpro, addImproAns, findProdByImproId };
