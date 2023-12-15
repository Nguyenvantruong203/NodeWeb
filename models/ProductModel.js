const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    minlength: [3, 'Product name must be at least 3 characters'],
    maxlength: [100, 'Product name cannot exceed 20 characters'],
  },
  image: String,
  detail: {
    type: String,
    required: [true, 'Product detail is required'],
    minlength: [10, 'Product detail must be at least 10 characters'],
  },
  price: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'brands',
  },
});

const ProductModel = mongoose.model('products', ProductSchema);
module.exports = ProductModel;
