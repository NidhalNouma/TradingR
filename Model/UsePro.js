const user = require("../Model/user");

const impro = async function (q, u, authId) {
  // console.log("qq ... ", q);
  // console.log("uu ... ", u);

  if (u["$push"]["products.$.improvements"] !== undefined) {
    console.log("impro");
    const r = await improUser(q, u);
    if (r) if (r.err) return r.err;
  } else if (
    u["$push"]["products.$[i].improvements.$[j].minus"] !== undefined
  ) {
    console.log("minus");
    const r = await negativeVote(q, u, authId);
    if (r) if (r.err) return r.err;
  } else if (u["$push"]["products.$[i].improvements.$[j].plus"] !== undefined) {
    console.log("Plus ");
    const r = await positiveVote(q, u, authId);
    if (r) if (r.err) return r.err;
  } else if (
    u["$push"]["products.$[i].improvements.$[j].answers"] !== undefined
  ) {
    console.log("impro answer");
    const r = await improAnswer(q, u, authId);
    if (r) if (r.err) return r.err;
  } else if (u["$push"]["products.$.qandas"] !== undefined) {
    console.log("questions");
    const r = await questionUser(q, u);
    if (r) if (r.err) return r.err;
  } else if (u["$push"]["products.$[i].qandas.$[j].answers"] !== undefined) {
    console.log("question answer");
    const r = await questionAnswer(q, u, authId);
    if (r) if (r.err) return r.err;
  }

  return null;
};

module.exports = {
  impro,
};

async function improUser(q, u) {
  const d = u["$push"]["products.$.improvements"];
  const urs = await user.addImpro(
    d["userId"],
    q["_id"],
    q["products._id"],
    d["_id"]
  );
  return urs;
}

async function improAnswer(q, u, authId) {
  const d = u["$push"]["products.$[i].improvements.$[j].answers"];
  //Add Notification
  const r = null;
  return r;
}

async function positiveVote(q, u, authId) {
  const d = u["$push"]["products.$[i].improvements.$[j].plus"];
  const r = await user.addScore(authId, 1, "jhug");
  return r;
}

async function negativeVote(q, u, authId) {
  const d = u["$push"]["products.$[i].improvements.$[j].minus"];
  const r = await user.addScore(authId, -1, "jhug");
  return r;
}

async function questionUser(q, u) {
  const d = u["$push"]["products.$.qandas"];
  const urs = await user.addQuestion(
    d["userId"],
    q["_id"],
    q["products._id"],
    d["_id"]
  );
  return urs;
}

async function questionAnswer(q, u, authId) {
  const d = u["$push"]["products.$[i].qandas.$[j].answers"];
  // Add notification
  const r = null;
  return r;
}
