const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    minlength: [3, 'Product name must be at least 3 characters'],
    maxlength: [100, 'Product name cannot exceed 20 characters'],
  },
  image: String,
  detail: String,
  price: String,
  material: String,
  date : String,
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
