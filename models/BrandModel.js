var mongoose = require('mongoose');
var BrandSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         minlength: [3, 'brand name must be at least 3 characters'],
         maxlength: 20
      },
      country: {
         type: String,
         required: [true, 'Country is required'],
         minlength: [3, 'Country name must be at least 3 characters'],
         maxlength: [30, 'Country name cannot exceed 30 characters'],
       },
   });
var BrandModel = mongoose.model('brands', BrandSchema);
module.exports = BrandModel;