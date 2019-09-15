var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Cart = require('./cart');
mongoose.models = {};
mongoose.modelSchemas = {};
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    avatar: {
        type: String, 
        default: 'assets/imgs/profileGeneric.jpg'
    },

    carts:[{type: mongoose.SchemaTypes.ObjectId, ref: 'Cart'}] 
});
UserSchema.pre('save',  function(next) {
    var user = this;
 
     if (!user.isModified('password')) return next();
 
     bcrypt.genSalt(10, function(err, salt) {
         if (err) return next(err);
 
         bcrypt.hash(user.password, salt, function(err, hash) {
             if (err) return next(err);
 
             user.password = hash;
             next();
         });
     });
});
 
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
UserSchema.methods.addCart  = function(id, cartId, callback){

    User.findByIdAndUpdate(id, {$push: {carts: cartId}}, callback);
  }


UserSchema.methods.getUserById = function(id, callback){
  User.findById(id, callback);
}

UserSchema.methods.getUserByEmail = function(email, callback){
  const query = {email: email}
  User.findOne(query, callback);
}
UserSchema.methods.getUserByUsername = function(username, callback){
  const query = {username: username};
  User.findOne(query, callback);
}
UserSchema.methods.getUserByQuery = function(query, callback){
  User.findOne(query, callback);
}


UserSchema.methods.addCart = function(id, cartId, callback){

  User.findByIdAndUpdate(id, {$push: {carts: cartId}}, callback);
}


UserSchema.methods.removeAccount = function(userObj, callback){
  User.findOneAndRemove({'_id': userObj.id}, (x)=>{
        Cart.deleteMany({userId: userObj.id}, callback);
    });
}
// module.exports.getUserById = function(id, callback){
//   User.findById(id, callback);
// }
module.exports = mongoose.model('User', UserSchema);

