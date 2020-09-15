const mongoose = require("mongoose");
const { qaSchema } = require("./QandA");
const { improSchema } = require("./impro");

const productSchema = new mongoose.Schema({
  createAt: { type: Date, default: Date.now },
  type: { type: String, required: [true, "Type is requierd"] },
  title: { type: String, required: [true, "Title is requierd"] },
  description: { type: String, required: [true, "Description is requierd"] },
  media: { type: String, required: [true, "Media is requierd"] },
  img: { type: String, required: [true, "Image is requierd"] },
  price: { type: String, required: [true, "Price is requierd"] },
  chartDetails: [{ type: Number }],
  qandas: { type: [qaSchema], default: [] },
  improvements: { type: [improSchema], default: [] },
  numberOfDownload: { type: Number },
  numberOfBuyers: { type: Number },
  numberOfVisitor: { type: Number },
});

const productVersionSchema = new mongoose.Schema({
  createAt: { type: Date, default: Date.now },
  type: { type: String, required: [true, "Type is requierd"] },
  price: {
    type: [
      {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    required: true,
  },
  product: {
    type: [
      {
        version: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    required: true,
  },
  subscribers: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
  likes: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
  numberOfDownload: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
  numberOfBuyers: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
  numberOfVisitor: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
});

const product = mongoose.model("Product", productSchema);
const productVersion = mongoose.model("ProductVersion", productVersionSchema);

const newProductVersion = async function (type) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding New Product Version with type ${type} ...`
  );
  const p = new productVersion({ type });
  let r = { res: null, err: null };
  try {
    r.res = await p.save();
  } catch (e) {
    console.log("\x1b[31m%s\x1b[0m", `Add New product Version Error ==> ${e}`);
    r.err = e;
  }

  return r;
};

const addProductToProductVersion = async function (pId, pvId, version) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Adding New Product ${pId} to product Version ${pvId} ...`
  );
  let r = { res: null, err: null };
  try {
    r.res = await productVersion.updateOne(
      { _id: pvId },
      { $push: { product: { version, product: pId } } }
    );
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Add new Product ${pId} to product Version ${pvId} Error ==> ${e}`
    );
    r.err = e;
  }

  return r;
};

const findAllProductVersion = async function () {
  console.log("\x1b[36m%s\x1b[0m", `Find All Product Versions ...`);
  let r = { res: null, err: null };
  try {
    r.res = await productVersion.find().populate({
      path: "product.product",
      populate: [
        { path: "qandas.userId", select: "username score userPicture" },
        { path: "qandas.answers.userId", select: "username score userPicture" },
        { path: "improvements.userId", select: "username score userPicture" },
        {
          path: "improvements.answers.userId",
          select: "username score userPicture",
        },
      ],
    });
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Finfing ALl Product Versions Error ==> ${e}`
    );
  }

  return r;
};

const findProductVersionById = async function (_id) {
  console.log("\x1b[36m%s\x1b[0m", `Find  Product Version By Id ${_id} ...`);
  let r = { res: null, err: null };
  try {
    r.res = await productVersion.findById({ _id }).populate({
      path: "product.product",
      populate: [
        { path: "qandas.userId", select: "username score userPicture" },
        { path: "qandas.answers.userId", select: "username score userPicture" },
        { path: "improvements.userId", select: "username score userPicture" },
        {
          path: "improvements.answers.userId",
          select: "username score userPicture",
        },
      ],
    });
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Finfing ALl Product Version By Id ${_id} Error ==> ${e}`
    );
  }

  return r;
};

const newProduct = async function (
  type,
  title,
  description,
  media,
  img,
  price
) {
  console.log("\x1b[36m%s\x1b[0m", `Adding New Product ${title} ...`);
  const p = new product({
    type,
    title,
    description,
    media,
    img,
    price,
  });
  let r = { res: null, err: null };

  try {
    r.res = await p.save();
  } catch (e) {
    console.log("\x1b[31m%s\x1b[0m", "Add New product Error ==>", e);
    r.err = e;
  }

  return r;
};

const findAll = async function () {
  console.log("\x1b[36m%s\x1b[0m", `Finding all products ...`);
  let r = { res: null, err: null };
  try {
    r.res = await product
      .find()
      .populate({
        path: "improvements.userId",
        select: "username score userPicture",
      })
      .populate({ path: "qandas.userId", select: "username score userPicture" })
      .populate({
        path: "improvements.answers.userId",
        select: "username score userPicture",
      })
      .populate({
        path: "qandas.answers.userId",
        select: "username score userPicture",
      });
  } catch (e) {
    console.log("\x1b[31m%s\x1b[0m", `Find All Products Error ==> ${e}`);
    r.err = e;
  }

  return r;
};

const findId = async function (_id) {
  console.log("\x1b[36m%s\x1b[0m", `Find Product by ID ${_id} ...`);
  let r = { res: null, err: null };

  try {
    r.res = await product
      .findOne({ _id })
      .populate({
        path: "improvements.userId",
        select: "username score userPicture",
      })
      .populate({ path: "qandas.userId", select: "username score userPicture" })
      .populate({
        path: "improvements.answers.userId",
        select: "username score userPicture",
      })
      .populate({
        path: "qandas.answers.userId",
        select: "username score userPicture",
      });
  } catch (e) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `Find Product with ID ${_id} Error ==> ${e}`
    );
    r.err = e;
  }
  return r;
};

module.exports = {
  newProductVersion,
  addProductToProductVersion,
  findAllProductVersion,
  findProductVersionById,
  product,
  productSchema,
  newProduct,
  findAll,
  findId,
};
