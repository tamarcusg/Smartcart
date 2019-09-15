// If an endpoint is protected inside the server, we have to check for 
//the Authorisation header field and see if it contains a valid JWT.
// And exactly this will be handled by our strategy.

// After grabbing the token by using the fromAuthHeaderAsBearerToken() 
//function we will try to find the user inside our database by calling User.findById(..)
//because our JWT payload will always contain the ID of a user.
// All of this will be handled in the background as a middleware which is basically an 
//additional handler of the incoming requests that can perform actions. 
//You could have as many middleware functions as you want
var User        = require('../models/user');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt  = require('passport-jwt').ExtractJwt;
var config      = require('../config/config');
 
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}
 
module.exports = new JwtStrategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload.id, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});