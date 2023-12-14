var express = require("express");
var router = express.Router();
var BrandModel = require("../models/BrandModel");
var ProductModel = require("../models/ProductModel");
var CategoryModel = require("../models/CategoryModel");
/* GET users listing. */
router.get("/", async (req, res) => {
  var products = await ProductModel.find({}).populate("brand", "categorie");
  res.render("admin/product/index", { products, layout: "layoutAdmin" });
});

router.get("/add", async (req, res) => {
  var brands = await BrandModel.find({});
  var categories = await CategoryModel.find({});
  res.render("admin/product/add", {
    brands,
    layout: "layoutAdmin",
    categories,
  });
});

router.post("/add", async (req, res) => {
  var product = req.body;
  await ProductModel.create(product);
  res.redirect("/product");
});

router.get("/delete/:id", async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.id);
  res.redirect("/product");
});

router.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  var product = await ProductModel.findById(id);
  var categories = await CategoryModel.find({});
  var brands = await BrandModel.find({});
  res.render("admin/product/edit", {
    product,
    brands,
    categories,
    layout: "layoutAdmin",
  });
});

router.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  var product = req.body;
  try {
    await ProductModel.findByIdAndUpdate(id, product);
    console.log("update succeed !");
  } catch (err) {
    console.log("update failed. Error: " + err);
  }
  res.redirect("/product");
});

router.get("/sort/asc", async (req, res) => {
  var products = await ProductModel.find()
    .populate("brand", "category")
    .sort({ model: 1 });
  res.render("admin/product/index", { products, layout: "layoutAdmin" });
});

router.get("/sort/desc", async (req, res) => {
  var products = await ProductModel.find()
    .populate("brand", "category")
    .sort({ model: -1});
  res.render("admin/product/index", { products, layout: "layoutAdmin"});
});

router.post("/search", async (req, res) => {
  var keyword = req.body.keyword;
  var products = await ProductModel.find({
    model: new RegExp(keyword, "i"),
  }).populate("brand", "category");
  res.render("admin/product/index", { products, layout: "layoutAdmin" });
});

module.exports = router;
