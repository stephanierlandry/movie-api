const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

let Movies = [
  {
    name: 'V for Vendetta',
    genre: 'thriller',
    description: 'Natalie Portman shaves her head',
    imageUrl: 'put the image url here',
    director: {
      name: 'Ron Howard',
      bio: 'Ron Howard was a child actor',
      birthyear: '1956',
      deathyear: ' '
    }
  },
  {
    name: 'Girl, Interrupted',
    genre: 'drama',
    description: 'Angelina Jolie has bad bangs',
    imageUrl:'put image url here',
    director:{
      name: 'James Mangold',
      bio: 'James Mangold has curly hair',
      birthyear: '1978',
      deathyear: ' '
    }
  }
];

let Users = [
  {
    username: 'steph',
    password: 'pass',
    email: 'sfd@gmail.com',
    favorites: ' '
  }
];

app.use(morgan('common'));

app.use(express.static('public'));

//    ---MOVIE ENDPOINTS---

//This endpoint gets all of the movies + data in the API
app.get("/movies", (req, res) => {
  res.json(Movies);
});

//This endpoint gets all data for a movie by the movie name
app.get("/movie/:name", (req, res) => {
  res.json(Movies.find((movie) =>
    {return movie.name === req.params.name}));
});

//This endpoint gets all data for a movie by the genre
app.get('/movies/:genre', (req, res) => {
  res.json(Movies.find((movie) =>
  { return movie.genre === req.params.genre}));
});


//   ---USER ENDPOINTS---

//This endpoint adds new users to the API by name
app.post("/users", (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    Users.push(newUser);
    res.status(201).send(newUser);
  }
});

//This endpoint allows a user to update their info
//Finish this
app.put("/update-users/:username/", (req, res) => {

});

//This endpoint deletes a user by name
app.delete("/delete-users/:username", (req,res) => {
  let user = Users.find(item => item.username === req.params.username);

  let deleteUser = req.params.username

  if (user) {
    Users.filter(function(obj){
      return obj.username !== deleteUser
    });
  res.status(201).send('User ' + deleteUser + ' was deleted.');
  }
});


//  ---FAVORITES ENDPOINTS---

//This endpoint adds favorites to a users profile
app.post("/users/favorites", (req,res) => {
  let newFavorite = req.body;

  if(!newFavorite.favorites){
    res.status(400).send('Missing favorite movie in request body')
  } else if(newFavorite === Users.favorites){
    res.send('This movie has already been added')
  } else {
    res.status(201).send(newFavorite + 'has been added to your favorites')
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


// app.get('/movies', function(req,res){
//   res.json(topMovies)
// })
// app.get('/', function(req,res){
//   res.send('Hello there')
// })
