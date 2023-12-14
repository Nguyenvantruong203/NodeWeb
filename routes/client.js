var express = require('express');
var router = express.Router();
var BrandModel = require('../models/BrandModel');
var ProductModel = require('../models/ProductModel');
var CategoryModel = require('../models/CategoryModel');

/* GET home page. */
router.get('/', async (req, res, next) => {
  var products = await ProductModel.find({})
  var categories = await CategoryModel.find({})
  res.render('client/home', {products, categories});
});

router.get('/menu', async(req, res, next)=> {
  var products = await ProductModel.find({})
  var categories = await CategoryModel.find({})
  res.render('client/menu', {products, categories});
});

router.get('/about', function(req, res, next) {
  res.render('client/about');
});

router.get('/book', function(req, res, next) {
  res.render('client/book');
});





module.exports = router;
