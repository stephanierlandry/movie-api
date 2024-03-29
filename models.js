const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Birth: String,
    Death: String
  },
  ImagePath: String,
  Featured: Boolean,
  Actors: [String]
});

const bcryptjs = require('bcryptjs');

let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoritesMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

userSchema.statics.hashPassword = function(password) {
  return bcryptjs.hashSync(password, 10);
  // console.log(password);
};


userSchema.methods.validatePassword = function(password) {
  return bcryptjs.compareSync(password, this.Password); };

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;



// var userSchema = mongoose.Schema({
//   Username : {type: String, required: true},
//   Password : {type: String, required: true},
//   Email : {type: String, required: true},
//   Birthday : Date,
//   FavoriteMovies : [{ type : mongoose.Schema.Types.ObjectId, ref: 'Movies' }]
// });

// userSchema.statics.hashPassword = function(password) {
//   return bcrypt.hashSync(password, 10);
// };
//
// userSchema.methods.validatePassword = function(password) {
//   return bcrypt.compareSync(password, this.Password); };
