var express = require('express');
var router = express.Router();
var BrandModel = require('../models/BrandModel');

router.get('/', async (req, res) => {
   try {
     const brands = await BrandModel.find({});
     res.render('admin/brand/index', { brands, layout: 'layoutAdmin.hbs'});
   } catch (error) {
     console.error(error);
     res.status(500).send('Internal Server Error');
   }
 });

router.get('/add', (req, res) => {
   res.render('admin/brand/add', {layout : 'layoutAdmin.hbs'});
})

router.post('/add', async (req, res) => {
   var brand = req.body;
   await BrandModel.create(brand);
   res.redirect('/brand');
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   try {
      //SQL: DELETE FROM brands WHERE brand = id
      await BrandModel.findByIdAndDelete(id);
      console.log('Delete brand succeed !');
   } catch (err) {
      console.log('Delete brand fail. Error: ' + err);
   };
   res.redirect('/brand');
})

router.get('/deleteall', async (req, res) => {
   //SQL: DELETE FROM brands
   //     TRUNCATE TABLE brands
   await BrandModel.deleteMany();
   console.log('Delete all brand succeed !');
   res.redirect('/brand');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var brand = await BrandModel.findById(id);
   res.render('admin/brand/edit', { brand, layout : 'layoutAdmin.hbs'});
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var brand = req.body;
   try {
      //SQL: UPDATE brands SET A = B WHERE id = 'id'
      await BrandModel.findByIdAndUpdate(id, brand);
      console.log('update succeed !');
   } catch (err) {
      console.log('update failed. Error: ' + err);
   }
   res.redirect('/brand');
})

module.exports = router;