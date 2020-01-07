const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');


var User = Models.User;
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;


// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     console.log(username + ' ' + password);
//     User.fineOne({Username: username}, function(err,user){
//       if (err) {return done(err);}
//       if (!user) {
//         return done( null, false, {message: 'Incorrect username.'});
//       }
//       if (user && !user.validPassword(password)){
//         return done(null, false, {message: 'Incorrect password.'});
//       }
//       return done(null,user);
//     });
//   }
// ));
//
// console.log('fuck');

passport.use(new LocalStrategy({
 usernameField: 'Username',
 passwordField: 'Password'
}, (username, password, callback) => {
 console.log({from: 'passport.js', u: username , p: password});
 User.findOne({ Username: username }, (error, user) => {
   if (error) {
     console.log(error);
     return callback(error);
   }
   if (!user) {
     console.log({from: 'passport.js', m: 'incorrect username'});
     return callback(null, false, {message: 'Incorrect username or password.'});
   }
   if(!user.validatePassword(password)){
     console.log({from: 'passport.js', m: 'incorrect password'});
     return callback(null,false, {message: 'Incorrect password.'});
   }
   console.log({from: 'passport.js', m: 'finished'});
   return callback(null, user);
 });
}));

passport.use(new JWTStrategy({
 jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
 secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
 return User.findById(jwtPayload._id)
 .then((user) => {
   return callback(null, user);
 })
 .catch((error) => {
   return callback(error)
 });
}));
