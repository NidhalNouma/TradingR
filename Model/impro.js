const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  // imprId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  answer: { type: String, required: [true, "Question is requierd"] },
  timestamp: { type: Date, default: Date.now },
  show: { type: Boolean, default: true },
});

const improSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  improvement: { type: String, required: [true, "Improvement is requierd"] },
  plus: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  minus: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  answers: { type: [answerSchema] },
  show: { type: Boolean, default: true },
});

const Impro = mongoose.model("Impro", improSchema);
const Answer = mongoose.model("Answer", answerSchema);

const addImpro = async function (_id, pId, userId, impro) {
  const productVersion = mongoose.models.ProductVersion;
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding new improvement for product ${_id} userID ${userId} ...`
  );
  const imp = new Impro({
    userId,
    improvement: impro,
  });
  let qu = { res: null, err: null, id: imp._id };

  const err = imp.validateSync();
  if (err) {
    qu.err = err;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Adding new improvement to product ${_id} Error ==> ${err}`
    );
    return qu;
  }
  try {
    qu.res = await productVersion.updateOne(
      { _id, "products._id": pId },
      { $push: { "products.$.improvements": imp } }
    );
    console.log(
      "\x1b[35m%s\x1b[0m",
      `New Improvement with Id ${imp._id} Added for Product with ID ${_id} ... `
    );
  } catch (err) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Add new improvement to Product ${_id} Error ==> ${err}`
    );
    qu.err = err.message;
  }
  return qu;
};

const addImproAns = async function (_id, pId, id, userId, answer, authId) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding new Answer for Improvement ${id} for Product ${pId} User ${userId} ...`
  );

  let r = { res: null, err: null };
  const answ = new Answer({ userId, answer });
  const productVersion = mongoose.models.ProductVersion;
  const err = answ.validateSync();
  if (err) {
    r.err = err;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `"Adding new Answer to Improvement ${id} for Product ${pId} Error ==> ${err}`
    );
    return r;
  }

  try {
    r.res = await productVersion.updateOne(
      { _id, "products._id": pId, "products.improvements._id": id },
      { $push: { "products.$[i].improvements.$[j].answers": answ }, authId },
      { arrayFilters: [{ "i._id": pId }, { "j._id": id }] }
    );
    console.log(
      "\x1b[35m%s\x1b[0m",
      `New Answer Added for Improvement ${id} for product ${pId} user ${userId} ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `"Error with Adding new Answer for Improvement ${id} for Product ${pId} ==> ${e}`
    );
    r.err = e;
  }

  return r;
};

const improVote = async function (_id, pId, id, userId, ty, authId) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding ${ty} to improvement ${id} for product ${_id} user ${userId} ...`
  );

  const productVersion = mongoose.models.ProductVersion;
  let r = { res: null, err: null };

  try {
    if (ty === "Plus") {
      r.res = await productVersion.updateOne(
        { _id, "products._id": pId, "products.improvements._id": id },
        {
          $push: { "products.$[i].improvements.$[j].plus": userId },
          authId,
        },
        { arrayFilters: [{ "i._id": pId }, { "j._id": id }] }
      );
    } else if (ty === "Minus") {
      r.res = await productVersion.updateOne(
        { _id, "products._id": pId, "products.improvements._id": id },
        { $push: { "products.$[i].improvements.$[j].minus": userId }, authId },
        { arrayFilters: [{ "i._id": pId }, { "j._id": id }] }
      );
    } else {
      throw "No type Define for vote (Plus Or Minus) ";
    }
    console.log(
      "\x1b[35m%s\x1b[0m",
      `${ty} Added to improvement ${id} for product ${_id} user ${userId} ...`
    );
  } catch (err) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `"Add ${ty} to Impro ${id} Error ==> ${err}`
    );
    r.err = err;
  }

  return r;
};

module.exports = {
  improSchema,
  addImpro,
  improVote,
  addImproAns,
};
