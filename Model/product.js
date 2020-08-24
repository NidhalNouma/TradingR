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
  console.log("\x1b[36m%s\x1b[0m", `Adding New Product ${title} ...`);
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
      console.log("\x1b[35m%s\x1b[0m", "New Product added ...");
      ans.added = true;
      ans.message = "Product added ...";
      callback(ans);
    } else {
      console.log("\x1b[31m%s\x1b[0m", "New product Error with add ==>", err);
      ans.message = err;
      callback(ans);
    }
  });
};

const findAll = function (callback) {
  console.log("\x1b[36m%s\x1b[0m", `Finding all products ...`);
  const ans = {
    find: false,
    error: null,
    results: null,
  };
  product.find(function (err, results) {
    if (err) {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "Find" + type + "Products Error ==> ",
        err
      );
      ans.error = err;
      callback(ans);
    } else {
      console.log("\x1b[35m%s\x1b[0m", `All products found ...`);
      ans.find = true;
      ans.results = results;
      callback(ans);
    }
  });
};

const findId = function (_id, callback) {
  console.log("\x1b[36m%s\x1b[0m", `Find Product by ID ${_id} ...`);
  const ans = {
    find: false,
    error: null,
    result: null,
  };

  product.findOne({ _id }, function (err, result) {
    if (err) {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "Find Product with ID" + _id + " Error ==> ",
        err
      );
      ans.error = err;
      callback(ans);
    } else {
      console.log("\x1b[35m%s\x1b[0m", `Product_ID ${_id} Found ...`);
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
  findId,
};
