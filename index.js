const mongoose = require('mongoose');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});


const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'))

app.use(morgan('common'));


//    ---MOVIE ENDPOINTS---

//This endpoint gets all of the movies + data in the API
app.get("/movies", (req, res) => {
  res.json(Movies);
});

//This endpoint gets all data for a movie by the movie name
app.get("/get-movies/title/:title", (req, res) => {
  let movieTitle = Movies.filter(word => word.title.toLowerCase() === req.params.title.toLowerCase());

    if(movieTitle){
      res.json(movieTitle);
    } else {
      res.status(400).send('Movie is not featured');
    }
});

//This endpoint gets all data for a movie by the genre
app.get("/get-movies/genre/:genre", (req, res) => {
  let movieGenre = Movies.filter(movie => movie.genre === req.params.genre.toLowerCase());

    if(movieGenre){
      res.json(movieGenre);
    } else {
      res.status(400).send('Movie is not featured');
    }
});

//This endpoint gets all data for a movie by the director
app.get("/get-movies/director/:director", (req,res) => {
  console.log(Movies[0].Director.Name);
  let movieDirector = Movies.filter(item => item.Director.Name === req.params.directorName);

  if(movieDirector){
    res.json(movieDirector);
  } else {
    res.status(400).send('Director is not featured');
  }
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
app.post("/update-users/newuser", (req, res) => {
  Users.findOne({ Username : req.body.Username})
  .then(function(user){
    if(user) {
      return res.status(400).send(req.body.Username + ' already exists');
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
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
app.put('/update-users/:username', (req, res) => {
  Users.findOneAndUpdate({ Username : req.params.Username }, { $set :
  {
    Username : req.body.Username,
    Password : req.body.Password,
    Email : req.body.Email,
    Birthday : req.body.Birthday
  }},
  { new : true },
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
      console.log(req.params.Username);
      res.json('You updated your info: ' + updatedUser)
    }
  })
});

//This endpoint deletes a user by username
app.delete("/delete-users/:username", (req,res) => {
  let user = Users.find(item => item.username === req.params.username);

  let deleteUser = req.params.username

  if (user) {
    Users.filter(function(obj){
      return obj.username !== deleteUser
    });
  res.status(202).send('User ' + deleteUser + ' was deleted.');
  }
});


//  ---FAVORITES ENDPOINTS---

//This endpoint adds favorites to a users profile
app.post("/update-users/:username/favorites/:userfavorite", (req,res) => {
  let user = Users.find(item => item.username === req.params.username);

  let newFavorite = req.body;

  if(!newFavorite.FavoriteMovie){
    res.status(400).send('Missing favorite movie in request body')
  } else if(newFavorite === Users.FavoriteMovie){
    res.send('This movie has already been added')
  } else {
    res.status(201).send(req.params.username + ', ' + newFavorite.FavoriteMovie + ' has been added to your favorites')
  }
});

//This endpoint deletes a favorite from a users profile
app.delete("/update-users/:username/delete-favorites/:userfavorite", (req,res) => {
  let user = Users.find(item => item.username === req.params.username);

  let deleteFavorite = req.params.userfavorite;

  if(deleteFavorite) {
    Users.filter(function(obj){
      return obj.FavoriteMovie !== deleteFavorite
    });
  res.status(202).send(deleteFavorite + ' has been deleted from your favorites.');
  }
});


//Error Message
app.use(function(err,req,res,next){
  console.log(err.stack);
  res.status(500).send('Something Broke')
});

app.listen(8080,() =>
  console.log('Hey')
);
