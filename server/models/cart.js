var mongoose = require('mongoose');
var product = require('./product')

var CartSchema = new mongoose.Schema({
    name: {type: String, required: true},
    product: [String],
    userId: {type: String},
    date: {type: Date},
    store: {type: String}
})

const Cart = module.exports = mongoose.model('Cart', CartSchema);

module.exports.getCartById = function(id, callback){
    console.log("Finding product models, models getProductById");
    Cart.findById(id, callback);
  }

module.exports.addCart = function(newCart, callback){
    console.log(newCart);
    newCart.save(callback);
  }
  module.exports.deleteCart = function(newCart, callback){
    console.log(newCart);
    Cart.findOneAndRemove({'_id': newCart._id}, callback);
  }