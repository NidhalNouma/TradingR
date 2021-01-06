const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  // qandaId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  answer: { type: String, required: [true, "Question is requierd"] },
  timestamp: { type: Date, default: Date.now },
  show: { type: Boolean, default: true },
});

const qaSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  question: { type: String, required: [true, "Question is requierd"] },
  answers: { type: [answerSchema] },
  show: { type: Boolean, default: true },
});

const qaModel = mongoose.model("Qanda", qaSchema);

const addQuestion = async function (_id, pId, userId, question) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding new Question for product ID ${_id} userID ${userId} ...`
  );
  const productVersion = mongoose.models.ProductVersion;
  const quest = new qaModel({
    userId,
    question,
  });
  let r = { res: null, err: null, id: quest._id };

  const err = quest.validateSync();
  if (err) {
    r.err = err;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `"Adding new Question to product ${_id} Error ==> ${err}`
    );
    return r;
  }
  try {
    r.res = await productVersion.updateOne(
      { _id, "products._id": pId },
      { $push: { "products.$.qandas": quest } }
    );
    console.log(
      "\x1b[35m%s\x1b[0m",
      `New Question Added for product ID ${_id} userID ${userId} ...`
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

const addQuestionAns = async function (_id, pId, id, userId, answer, authId) {
  const productVersion = mongoose.models.ProductVersion;
  const Answer = mongoose.model("Answerqa", answerSchema);
  const answ = new Answer({ userId, answer });
  let r = { res: null, err: null };
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Answer for Question Id ${id} for product ID ${pId} userID ${userId} ...`
  );

  try {
    r.res = await productVersion.updateOne(
      { _id, "products._id": pId, "products.qandas._id": id },
      { $push: { "products.$[i].qandas.$[j].answers": answ }, authId },
      { arrayFilters: [{ "i._id": pId }, { "j._id": id }] }
      // { _id: pId, "qandas._id": id },
      // { $push: { "qandas.$.answers": answ } }
    );
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Answer Added for Question Id ${id} for product ID ${pId} userID ${userId} ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with Adding new Answer To question ID ${id} with Product with ID ${pId} ==> ${e}`
    );
    r.err = e;
  }

  return r;
};

module.exports = { qaSchema, addQuestion, addQuestionAns };
