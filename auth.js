let jwtSecret = 'your_jwt_secret';
let jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport');

function generateJWTToken(user){
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: '7d',
    algorithm: 'HS256'
  });
}

module.exports = (router) => {
 router.post('/login', function(req, res, next){
   // console.log(res);
   passport.authenticate('local', { session : false}, (error, user, info) => {

     console.log({from: 'auth.js', e: error, u: user, i: info});
     if (error) {
       return res.status(400).json({
         message: 'Something is not right'
       });
     }
     if (!user) {
       return res.status(400).json({
         message: 'No User',
         user
       });
     }
     req.login(user, { session: false }, (error) => {
       if (error) {
         res.send(error);
       }
       var token = generateJWTToken(user.toJSON());
       return res.json({ user, token });
     });
   })(req, res, next);
 });
}
