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

const newProduct = function (
  type,
  title,
  description,
  media,
  img,
  price,
  callback
) {
  const p = new product({
    type,
    title,
    description,
    media,
    img,
    price,
  });

  const ans = {
    added: false,
    message: null,
  };

  p.save(function (err) {
    if (!err) {
      console.log("New Product saved ...");
      ans.added = true;
      ans.message = "Product added ...";
      callback(ans);
    } else {
      console.log("New product Error with save ...", err);
      ans.message = err;
      callback(ans);
    }
  });
};

const findAll = function (callback) {
  const ans = {
    find: false,
    error: null,
    results: null,
  };
  product
    .find(function (err, results) {
      if (err) {
        console.log("Find" + type + "Products Error ...", err);
        ans.error = err;
        callback(ans);
      } else {
        ans.find = true;
        ans.results = results;
        callback(ans);
      }
    })
    .select("_id title description price media img type");
};

const findAllType = function (type) {
  product
    .find({ type }, function (err, results) {
      if (err) {
        console.log("Find" + type + "Products Error ...", err);
      } else {
        console.log(results);
      }
    })
    .select("title description price media");
};

const findId = function (_id, callback) {
  const ans = {
    find: false,
    error: null,
    result: null,
  };

  product.findOne({ _id }, function (err, result) {
    if (err) {
      console.log("Find Product with ID" + _id + " Error ...", err);
      ans.error = err;
      callback(ans);
    } else {
      ans.find = true;
      ans.result = result;
      callback(ans);
    }
  });
};

module.exports = {
  product,
  productSchema,
  newProduct,
  findAll,
  findAllType,
  findId,
};
