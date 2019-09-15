var Product = require('../models/product');

exports.addProduct = (req, res) => {
    if(!req.body.name){
        return res.status(400).json({'msg': 'Product must have name attribute'})
    }

    Product.findOne({ name: req.body.name }, (err, product) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
 
        if (product) {
            return res.status(400).json({ 'msg': 'The product already exists' });
        }
 
        let newProduct = Product(req.body);
        newProduct.save((err, product) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            return res.status(201).json(product);
        });
    });
};

exports.removeProduct = (req,res) => {
    Product.findOneAndRemove({_id: req.id}), (err, product) => {
        if(err) {
            return res.status(400).json({'msg': 'Yeah aiight'})
        }
        if(product) {
            return res.status(201).json(product);
        }
    }
}

exports.getAllProducts = (req,res)  =>{
    Product.find({}, (err, products) =>{
      if(err){
        console.log(err);
        return res.json({success: false, msg:"Error when getting products"});
      }
      if(!products){
          console.log(err);
          return res.json({success: false, msg:"Error when getting products"});
      }
      else{
        return res.json({success: true, spots: products.reverse()});
      }
    })}