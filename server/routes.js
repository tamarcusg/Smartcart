var express         = require('express'),
    routes          = express.Router();
var userController  = require('./controller/user-controller');
var productController  = require('./controller/product-controller');
var Product = require('./models/product');
var passport	    = require('passport');
const jwt = require('jsonwebtoken');
var cartController = require('./controller/cart-controller')
 
routes.get('/', (req, res) => {
    return res.send('Hello, this is the API!');
});
//ROUTES FOR USER
routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.post('/delete', passport.authenticate('jwt', {session:false}) ,(req, res, next) =>{
  console.log(req.body);
  User.removeAccount(req.body, (err, val) => {
    if(err){
      return res.json({success: false, msg: 'Failed to delete account. Try again.'});
    }
    else {
      return res.json({success: true, msg: 'Account removed!'});
    }
  });
  });
 
routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({ msg: `Hey ${req.user.email}! I open at the close.` });
});


//PRODUCT ROUTES
routes.post('/product/remove', productController.removeProduct);
routes.post('/product/add',productController.addProduct);
//Product Test
routes.get('/products/all',productController.getAllProducts);

//Routes for Cart   
routes.post('/cart/create', cartController.addCart);
routes.get('/carts/all',cartController.getAllCarts)
routes.get('/cart/user/:id', cartController.getUserCarts);
routes.put('/cart/update/:id', cartController.updateCart);
routes.delete('/cart/delete/:id', cartController.deleteCart);


module.exports = routes;