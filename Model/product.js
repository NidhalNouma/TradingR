const mongoose = require("mongoose");
const { qaSchema } = require("./QandA");
const { improSchema } = require("./impro");
const { impro } = require("./UsePro");

const productSchema = new mongoose.Schema({
  createAt: { type: Date, default: Date.now },
  title: { type: String, required: [true, "Title is requierd"] },
  version: {
    type: Number,
    required: [true, "version is requierd"],
  },
  available: {
    MT4: { type: Boolean, default: false },
    MT5: { type: Boolean, default: false },
    tradingView: { type: Boolean, default: false },
  },
  description: { type: String, required: [true, "Description is requierd"] },
  moreDes: {
    result: { type: [String] },
    inputs: { type: [String] },
    screenshots: { type: [String] },
    whatsNew: { type: String },
  },
  media: { type: String, required: [true, "Media is requierd"] },
  img: { type: String, required: [true, "Image is requierd"] },
  qandas: { type: [qaSchema], default: [] },
  improvements: { type: [improSchema], default: [] },
  show: { type: Boolean, default: true },
});

const productVersionSchema = new mongoose.Schema({
  createAt: { type: Date, default: Date.now },
  type: {
    type: String,
    enum: ["Indicator", "EA"],
    required: [true, "Type is requierd"],
  },
  products: {
    type: [{ type: productSchema }],
    required: true,
  },
  subscribers: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
  },
  downloads: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User", default: [] }],
  },
  show: { type: Boolean, default: true },
});

productVersionSchema.pre("updateOne", async function (next) {
  const authId = this.getUpdate().authId;
  if (authId) delete this.getUpdate().authId;
  const q = this.getFilter();
  const u = this.getUpdate();

  // console.log(this.getUpdate(), authId);
  if (u["$push"]) {
    const r = await impro(q, u, authId);
    if (r) {
      next(r);
    }
  }
  next();
});

const productVersion =
  mongoose.models.ProductVersion === undefined
    ? mongoose.model("ProductVersion", productVersionSchema)
    : mongoose.models.ProductVersion;

const hide = async function (id) {
  console.log("\x1b[36m%s\x1b[0m", `Hiding product ${id} ...`);
  let r = { res: null, err: null };
  try {
    r.res = await productVersion.updateOne({ _id: id }, { show: true });
    console.log("\x1b[35m%s\x1b[0m", `Product ${id} hided ...`);
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Errer with hiding product ${id} ==> ${e}`
    );
    r.err = e;
  }
  return r;
};

const addNewProduct = async function (type, product) {
  console.log("\x1b[36m%s\x1b[0m", `Adding New Product with type ${type} ...`);
  let r = { res: null, err: null };
  let pr = null;
  try {
    pr = checkProduct(product);
  } catch (e) {
    console.log("\x1b[31m%s\x1b[0m", `Add New product Error ==> ${e.message}`);
    r.err = e.message;
    return r;
  }

  const p = new productVersion({ type, products: [pr] });
  try {
    r.res = await p.save();
    console.log("\x1b[35m%s\x1b[0m", "New Product added ...");
  } catch (e) {
    r.err = e.message;
    console.log("\x1b[31m%s\x1b[0m", `Add New productV Error ==> ${e.message}`);
  }
  return r;
};

const addNewVersion = async function (id, product) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding New version to Product id ${id} ...`
  );
  let r = { res: null, err: null };

  let pr = null;
  try {
    pr = checkProduct(product);
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Add new version to product id ${id} Error ==> ${e}`
    );
    r.err = e;
    return r;
  }
  try {
    r.res = await productVersion.updateOne(
      { _id: id },
      { $push: { products: pr } }
    );
    console.log(
      "\x1b[35m%s\x1b[0m",
      `New Version added to product id ${id} ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Add new version to product id ${id} Error ==> ${e}`
    );
    r.err = e;
  }
  return r;
};

const findAllProduct = async function (type) {
  console.log("\x1b[36m%s\x1b[0m", `Find All Products ${type} ...`);
  let r = { res: null, err: null };
  const f = type === "undefined" ? {} : { type };

  try {
    r.res = await productVersion.find(f).populate({
      path: "products",
      populate: [
        { path: "qandas.userId", select: "userName score userPicture" },
        {
          path: "qandas.answers.userId",
          select: "userName score userPicture",
        },
        { path: "improvements.userId", select: "userName score userPicture" },
        {
          path: "improvements.answers.userId",
          select: "userName score userPicture",
        },
      ],
    });
    console.log("\x1b[35m%s\x1b[0m", `Products Found All ${type} ...`);
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Finding ALl Products ${type} Error ==> ${e}`
    );
  }
  return r;
};

const findProductById = async function (_id) {
  console.log("\x1b[36m%s\x1b[0m", `Find  Product By Id ${_id} ...`);
  let r = { res: null, err: null };
  try {
    r.res = await productVersion.findById({ _id }).populate({
      path: "products",
      populate: [
        { path: "qandas.userId", select: "userName score userPicture" },
        { path: "qandas.answers.userId", select: "userName score userPicture" },
        { path: "improvements.userId", select: "userName score userPicture" },
        {
          path: "improvements.answers.userId",
          select: "userName score userPicture",
        },
      ],
    });
    console.log("\x1b[35m%s\x1b[0m", `Product ${_id} found ...`);
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Finding Product By Id ${_id} Error ==> ${e}`
    );
  }
  return r;
};

const download = async (pvId, userId) => await push(pvId, userId, 1);
const subscribe = async (pvId, userId) => await push(pvId, userId);
const desubscribe = async (pvId, userId) => await pull(pvId, userId);

module.exports = {
  productVersion,
  productSchema,
  addNewProduct,
  addNewVersion,
  findAllProduct,
  findProductById,
  subscribe,
  desubscribe,
  download,
  hide,
};

const checkProduct = function (pr) {
  const product = mongoose.model("Product", productSchema);
  const pri = new product(pr);
  const err = pri.validateSync();
  if (err) {
    throw err;
  }
  return pri;
};

const push = async function (pvId, userId, type) {
  const data = { subscribers: userId };
  if (type === 1) data = { downloads: userId };
  const key = Object.keys(data)[0];
  console.log(
    "\x1b[36m%s\x1b[0m",
    `New ${key} userId${userId} for ProductVersion ${pvId} ...`
  );
  let r = { res: null, err: null };
  try {
    r.res = await productVersion.updateOne({ _id: pvId }, { $push: data });
    console.log(
      "\x1b[35m%s\x1b[0m",
      `New ${key} userId${userId} for ProductVersion ${pvId} Added ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Errer with adding ${key} userId${userId} for ProductVersion ${pvId} ==> ${e}`
    );
    r.err = e;
  }
  return r;
};

const pull = async function (pvId, userId) {
  const data = { subscribers: userId };
  const key = Object.keys(data)[0];
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Remove ${key} userId${userId} for ProductVersion ${pvId} ...`
  );
  let r = { res: null, err: null };
  try {
    r.res = await productVersion.updateOne({ _id: pvId }, { $pull: data });
    console.log(
      "\x1b[35m%s\x1b[0m",
      `Removed ${key} userId${userId} for ProductVersion ${pvId} ...`
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Errer with Removing ${key} user ${userId} for ProductVersion ${pvId} ==> ${e}`
    );
    r.err = e;
  }
  return r;
};
