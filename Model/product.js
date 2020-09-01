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
  qandas: { type: [qaSchema] },
  improvements: { type: [improSchema] },
  numberOfDownload: { type: Number },
  numberOfBuyers: { type: Number },
  numberOfVisitor: { type: Number },
});

const product = mongoose.model("Product", productSchema);

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
  product,
  productSchema,
  newProduct,
  findAll,
  findId,
};
