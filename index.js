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
    imageurl: 'put the image url here',
    director: {
      name: 'Ron Howard',
      bio: 'Rob Howard was a child actor',
      birthyear: '1956',
      deathyear: ' '
    }
  }
];

let Users = [
  {
    username: 'steph',
    password: 'pass',
    email: 'sfd@gmail.com'
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
app.get("/movies/:name", (req, res) => {
  res.json(Movies.find((movie) =>
    {return movie.name === req.params.name}));
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

app.delete("/users/:username", (req,res) => {
  let user = Users.find((user) => {
    return user.username === req.params.username});

    if (user) {
    Users = Users.filter(function(obj) { return obj.username !== req.params.username; });
    res.status(201).send('User ' + user.username + ' with name ' + req.params.username + ' was deleted.')
  } else {
    res.status(500).send('Error!');
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
