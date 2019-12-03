
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;

// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.connect('mongodb+srv://DesignMovieDBAdmin:Huckabees549@cluster0-mrrrr.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'))

app.use(morgan('common'));

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

const cors = require('cors');
app.use(cors());

let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      var message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));

const { check, validationResult } = require('express-validator');

//Root Route
app.get('/', function(req, res){
  res.send('hello world')
})

//    ---MOVIE ENDPOINTS---

//This endpoint gets all of the movies + data in the API
app.get("/movies",  (req, res) => {
  Movies.find()
  .then(function(movie) {
    res.json(movie)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//This endpoint gets all data for a movie by the movie name
app.get("/get-movies/title/:title", passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.findOne({ Title : req.params.title })
  .then(function(movie) {
    res.json(movie)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//This endpoint gets all data for a movie by the genre
app.get("/get-movies/genre/:genre", passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.find({ 'Genre.Name' : req.params.genre})
  .then(function(movie) {
    console.log(movie);
    res.json(movie)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//This endpoint gets all data for a movie by the director
app.get("/get-movies/director/:director", passport.authenticate('jwt', {session: false}), (req,res) => {
  Movies.findOne({ 'Director.Name' : req.params.director })
  .then(function(movie) {
    console.log(req.params.director);
    res.json(movie)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


//   ---USER ENDPOINTS---

//This endpoint shows a user by Username
app.get('/get-users/:Username', function(req, res) {
  Users.findOne({ Username : req.params.Username })
  .then(function(user) {
    res.json(user)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

//This endpoint adds new users to the API by name
app.post("/update-users/newuser", [check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()], (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username : req.body.Username})
  .then(function(user){
    if(user) {
      return res.status(400).send(req.body.Username + ' already exists');
    } else {
      Users.create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user){
        res.status(201).json(user)
      })
      .catch(function(error){
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  }).catch(function(error){
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

//This endpoint allows a user to update their info
  app.put('/update-users/:Username', [check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()], passport.authenticate('jwt', {session: false}), (req, res) => {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate({ Username : req.params.Username }, { $set :
    {
      Username : req.body.Username,
      Password : req.body.Password,
      Email : req.body.Email,
      Birthday : req.body.Birthday
    }},
    { new : true })
    .then(function(updateUsers){
      res.json(updateUsers)
    })
    .catch(function(error){
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
  });

//This endpoint deletes a user by username
app.delete('/delete-users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(error) {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});


//  ---FAVORITES ENDPOINTS---

//This endpoint adds favorites to a users profile
//Update this to only add a movie once
app.post('/update-users/:username/movies/:movieID', passport.authenticate('jwt', {session: false}), function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.username }, {
    $push : { Favorites : req.params.movieID }
  },
  { new : true },
  function(err, updatedUser) {
    if (err) {
      console.error(error);
      res.status(500).send('Error: ' + error);
    } else {
      res.json(updatedUser)
    }
  })
});

//This endpoint deletes a favorite from a users profile
app.delete("/update-users/:username/favorites/:movieID", passport.authenticate('jwt', {session: false}), (req,res) => {
  Users.findOneAndUpdate({ Username : req.params.username}, {
    $unset : { Favorites : req.params.movieID}
  },
  {new : true})
  .then(function(user){
    res.json(user).send('Movie was deleted')
  })
  .catch(function(error){
    res.status(500).send('Error: ' + error)
  })
});

//Error Message
app.use(function(err,req,res,next){
  console.log(err.stack);
  res.status(500).send('Something Broke')
});

let port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});
