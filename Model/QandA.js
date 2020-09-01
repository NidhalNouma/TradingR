const mongoose = require("mongoose");
const { productSchema } = require("./product");

const answerSchema = new mongoose.Schema({
  qandaId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  answer: { type: String, required: [true, "Question is requierd"] },
  timestamp: { type: Date, default: Date.now },
});

const qaSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  productId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  question: { type: String, required: [true, "Question is requierd"] },
  answers: { type: [answerSchema] },
});

const qaModel = mongoose.model("Qanda", qaSchema);

const addQuestion = async function (_id, userId, question) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding new Question for product ID ${_id} userID ${userId} ...`
  );
  const product = mongoose.model("Product", productSchema);
  const quest = new qaModel({
    productId: _id,
    userId,
    question,
  });
  let r = { res: null, err: null };
  try {
    r.res = await product.findByIdAndUpdate(
      { _id },
      { $push: { qandas: quest } }
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with Adding new question To Product with ID ${_id} ==> ${e}`
    );
    r.err = e;
  }
  return r;
};

const addQuestionAns = async function (pId, id, userId, answer) {
  const product = mongoose.model("Product", productSchema);
  const Answer = mongoose.model("Answerqa", answerSchema);
  const answ = new Answer({ qandas: id, userId, answer });
  let r = { res: null, err: null };
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Answer for Question Id ${id} for product ID ${pId} userID ${userId} ...`
  );

  try {
    r.res = await product.updateOne(
      { _id: pId, "qandas._id": id },
      { $push: { "qandas.$.answers": answ } }
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with Adding new Answer To question ID ${id} with Product with ID ${pid} ==> ${e}`
    );
    r.err = e;
  }

  return r;
};

module.exports = { qaSchema, addQuestion, addQuestionAns };
