const mongoose = require("mongoose");
const { productSchema } = require("./product");

const answerSchema = new mongoose.Schema({
  imprId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  answer: { type: String, required: [true, "Question is requierd"] },
  timestamp: { type: Date, default: Date.now },
});

const improSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  productId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: String, required: true, ref: "User" },
  improvement: { type: String, required: [true, "Improvement is requierd"] },
  plus: [{ type: mongoose.Types.ObjectId }],
  minus: [{ type: mongoose.Types.ObjectId }],
  answers: { type: [answerSchema] },
});

const Impro = mongoose.model("Impro", improSchema);
const Answer = mongoose.model("Answer", answerSchema);

const addImpro = async function (_id, userId, impro) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding new improvement for product ID ${_id} userID ${userId} ...`
  );
  const product = mongoose.model("Product", productSchema);
  const imp = new Impro({
    productId: _id,
    userId,
    improvement: impro,
  });

  let qu = { res: null, err: null };
  try {
    qu.res = await product.findByIdAndUpdate(
      { _id },
      { $push: { improvements: imp } }
    );
  } catch (err) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `"Add new improvement Product with ID ${_id} Error ==> ${err}`
    );
    qu.err = err;
  }
  return qu;
};

const addImproAns = async function (pId, id, userId, answer) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding new Answer for Improvement Id ${id} for product ID ${pId} userID ${userId} ...`
  );
  const product = mongoose.model("Product", productSchema);
  const answ = new Answer({ improId: id, userId, answer });

  let r = { res: null, err: null };
  try {
    r.res = await product.findOneAndUpdate(
      { _id: pId, "improvements._id": id },
      { $push: { "improvements.$.answers": answ } }
    );
  } catch (err) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `"Error with Adding new Answer for Improvement Id ${id} for Product with ID ${pId} ==> ${err}`
    );
    r.err = err;
  }

  return r;
};

const improPlus = async function (_id, id, userId) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Plus to improvementID ${id} for product ID ${_id} userID ${userId} ...`
  );
  const product = mongoose.model("Product", productSchema);
  let r = { res: null, err: null };

  try {
    r.res = await product.findOneAndUpdate(
      { _id, "improvements._id": id },
      { $push: { "improvements.$.plus": userId } }
    );
  } catch (err) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `"Add new Plus to Impro with ID ${id} Error ==> ${err}`
    );
    r.err = err;
  }

  return r;
};

const improMin = async function (_id, id, userId) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding Minus to improvementID ${id} for product ID ${_id} userID ${userId} ...`
  );
  const product = mongoose.model("Product", productSchema);
  let r = { res: null, err: null };

  try {
    r.res = await product.updateOne(
      { _id, improvements: { $elemMatch: { _id: id } } },
      { $push: { "improvements.$.minus": userId } }
    );
  } catch (err) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Add new minus to Impro with ID ${id} Error ==> ${err}`
    );
    r.err = err;
  }

  return r;
};

module.exports = {
  improSchema,
  addImpro,
  improPlus,
  improMin,
  addImproAns,
};
