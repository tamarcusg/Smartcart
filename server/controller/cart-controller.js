var mongoose = require('mongoose');
const User = require('../models/User')
const Cart = require('../models/cart')

exports.addCart = (req, res) => {
  User.findById(req.body.userId, (err,user) => {
    if(err){
      console.log(err);
      return res.json({success: false, msg:"Error when creating cart"});
    }
    if(user){
      console.log(req.body)
      let cartObj = Cart(req.body)
      cartObj.save(cartObj, (err,cart) =>{
        if(err){
          console.log(err);
          return res.json({success: false, msg:"Error when adding Cart"});
        }
        User.findByIdAndUpdate(user._id, {$push: {carts: cart._id}}, (err,x) => {
          if(err){
            return res.json({success: false, msg:"Error when posting"});
          }
          else{
            return res.json({success: true, msg:"good", id: cart._id}) //+ res.status(200).send(cart._id);
            
          }
        })
      });
    }
    else{
      return res.json({success: false, msg:"Error when posting"});
    }
  })
}
exports.getAllCarts = (req,res)  =>{
  Cart.find({}, (err, carts) =>{
    if(err){
      console.log(err);
      return res.json({success: false, msg:"Error when getting carts"});
    }
    if(!carts){
        console.log(err);
        return res.json({success: false, msg:"Error when getting products"});
    }
    else{
      return res.json({success: true, carts: carts.reverse()});
    }
  })
}

exports.getUserCarts = (req, res) =>{
  Cart.find({_id: req.params.id}, (err, carts) =>{
    if(err){
      console.log(err);
      return res.json({success: false, msg:"Error when getting Carts"});
    }
    if(!carts){
        console.log(err);
        return res.json({success: false, msg:"Error when getting Carts"});
    }
    else{
      return res.json({success: true, carts: carts.reverse()});
    }
  });
}

exports.updateCart = (req,res ) => {
  console.log(req.body)
  Cart.findOne({_id: req.params.id}, (err,cart)=>{
    if(err){
      return res.json({sucess: false, msg: "No Cart Found"})
    }
    else{
      Cart.findByIdAndUpdate(cart._id, {"product": req.body.product}, (err,result)=>{
        if(err){
          return res.json({success: false, msg: "Unable to update Cart"})
        }
        else{
          return res.json({success: true, msg: "Cart updated"})
        }
      })
    }
  })
}

exports.deleteCart = (req,res) => {
  Cart.findOne({_id: req.params.id}, (err,cart) => {
    if(err){
      return res.json({success: false, msg: "Could not find cart"})
    }
    else{
      Cart.findByIdAndDelete(cart._id, (err,result) =>{
        if(err){
          return res.json({sucess: false, msg: "Error deleting the cart"})
        }
        else{
          return res.json({success: true, msg: "Cart " + cart.name+ " deleted successfully"})
        }
      })
    }
  })
}
