const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  id: { type: mongoose.Types.ObjectId, ref: "User", unique: true },
  account: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId(),
      },
      number: { type: String, default: "" },
      server: { type: String, default: "" },
      results: { type: Array, default: [] },
      show: { type: Boolean, default: true },
      product: [{ type: mongoose.Types.ObjectId, ref: "ProductVersion" }],
    },
  ],
});

const Account = mongoose.model("Account", accountSchema);

const addNew = async function (id, number, server, product) {
  console.log("\x1b[36m%s\x1b[0m", `Adding account to User ${id} ...`);
  let r = { res: null, err: null };
  const acc = new Account({
    id,
    account: [{ number, server, product: [product] }],
  });

  const er = acc.validateSync();
  if (er) {
    r.err = er.message;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with Validate new account ==> ${er}`
    );
    return r;
  }

  try {
    r.res = await acc.save();
    console.log("\x1b[35m%s\x1b[0m", `Account for User saved ${id} ...`);
  } catch (e) {
    r.err = e.message;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with Adding account to User ==> ${e}`
    );
  }

  return r;
};

const addAccount = async function (id, number, server, product) {
  console.log("\x1b[36m%s\x1b[0m", `Adding account to list to User ${id} ...`);
  let r = { res: null, err: null };

  try {
    r.res = await Account.updateMany(
      { id },
      { $addToSet: { account: { number, server, product: [product] } } }
    );
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Account added to list for User ${id} ...`
    );
  } catch (e) {
    r.err = e.message;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with Adding account to list ==> ${e}`
    );
  }

  return r;
};

const addProduct = async function (id, number, server, product) {
  console.log("\x1b[36m%s\x1b[0m", `Adding product to list to User ${id} ...`);
  let r = { res: null, err: null };

  try {
    r.res = await Account.updateMany(
      {
        id,
        "account.number": number,
        "account.server": server,
      },
      { $addToSet: { "account.$.product": product } }
    );
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Product added to list for User ${id} ...`
    );
  } catch (e) {
    r.err = e.message;
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Error with Adding Product to list ==> ${e}`
    );
  }

  return r;
};

const findAccount = async function (id, number, server) {
  console.log("\x1b[36m%s\x1b[0m", `Finding account for User ${id} ...`);
  let r = { res: null, err: null, found: false };

  try {
    r.res = await Account.findOne({
      id,
      "account.number": number,
      "account.server": server,
    });
    r.found = true;
    console.log("\x1b[35m%s\x1b[0m", `Account found for User ${id} ...`);
  } catch (e) {
    r.err = e.message;
    console.log("\x1b[31m%s\x1b[0m", `Error with finding account ==> ${e}`);
  }

  return r;
};

const addResult = async function (id, number, server, result) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding results to Account for User ${id} ...`
  );
  let r = { res: null, err: null };

  try {
    r.res = await Account.updateOne(
      { id, "account.number": number, "account.server": server },
      { "account.$.result": result }
    );
    console.log("\x1b[35m%s\x1b[0m", `Result added for User ${id} ...`);
  } catch (e) {
    r.err = e.message;
    console.log("\x1b[31m%s\x1b[0m", `Error with adding result ==> ${e}`);
  }

  return r;
};

module.exports = { addNew, addAccount, findAccount, addResult, addProduct };
