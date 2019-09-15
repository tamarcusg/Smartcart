var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, max: 100},
    price: {type: Number, max: 100},
    quantity:{type: Number},
    picURL : {type: String},
    aisleNumber: {type: Number}
})

const Product = module.exports = mongoose.model('Product', ProductSchema);


module.exports.getProductById = function(id, callback){
    console.log("Finding product models, models getProductById");
    Product.findById(id, callback);
  }

module.exports.addProduct = function(newProduct, callback){
    console.log(newProduct);
    newProduct.save(callback);
  }
  module.exports.deleteSpot = function(newProduct, callback){
    console.log(newProduct);
    Product.findOneAndRemove({'_id': newProduct._id}, callback);
  }