const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'))

let Movies = [
  {
    title: 'V-for-Vendetta',
    genre: 'thriller',
    description: 'Natalie Portman shaves her head',
    imageUrl: 'put the image url here',
    directorName: 'James-McTeigue',
    directorBio: 'James McTeigue is an Australian film director. He has been an assistant director on many films, including Dark City (1998), the Matrix trilogy (1999–2003) and Star Wars: Episode II – Attack of the Clones (2002), and made his directorial debut with the 2005 film V for Vendetta to critical acclaim. Since Vendetta he has collaborated with the Wachowskis an additional three times as director on The Invasion (albeit uncredited), Ninja Assassin and Sense8.',
    directorBirthyear: '1967',
    directorDeathyear: ' '
  },
  {
    title: 'Girl-Interrupted',
    genre: 'drama',
    description: 'Angelina Jolie has bad bangs',
    imageUrl:'put image url here',
    directorname: 'James-Mangold',
    directorBio: 'James Mangold is an American film and television director, screenwriter and producer. He is best known for directing the films Logan, Cop Land, Girl, Interrupted, Kate & Leopold, Walk the Line, and 3:10 to Yuma',
    directorBirthyear: '1963',
    directorDeathyear: ' '
  },
  {
    title: 'The-Mummy',
    genre: 'action',
    description: 'Brenden Fraiser is lame',
    imageUrl:'put image url here',
    directorName: 'Stephen-Sommers',
    directorBio: 'Stephen Sommers is an American film director and screenwriter, best known for big-budget movies, such as The Mummy, its sequel, The Mummy Returns, Van Helsing, and G.I. Joe: The Rise of Cobra.',
    directorBirthyear: '1962',
    directorDeathyear: ' '
  },
  {
    title: 'Fight-Club',
    genre: 'psychological',
    description: 'Brad Pitt has abs',
    imageUrl:'put image url here',
    directorName: 'David-Fincher',
    directorBio: 'David Andrew Leo Fincher is an American film director, film producer, television director, television producer, and music video director. He was nominated for the Academy Award for Best Director for The Curious Case of Benjamin Button and The Social Network.',
    directorBirthyear: '1962',
    directorDeathyear: ' '
  },
  {
    title: 'The-Matrix',
    genre: 'action',
    description: 'Sunglasses are everywhere',
    imageUrl:'put image url here',
    directorName: 'The-Wachowskis',
    directorBio: 'There are two',
    directorBirthyear: '1963',
    directorDeathyear: ' '
  },
  {
    title: 'The-Talented-Mr-Ripley',
    genre: 'thriller',
    description: 'Matt Damon is a creep',
    imageUrl:'put image url here',
    directorName: 'Anthony-Minghella',
    directorBio: 'Anthony Minghella, CBE was a British film director, playwright and screenwriter. He was chairman of the board of Governors at the British Film Institute between 2003 and 2007. He won the Academy Award for Best Director for The English Patient.',
    directorBirthyear: '1954',
    directorDeathyear: '2008'
  },
  {
    title: 'Any-Given-Sunday',
    genre: 'drama',
    description: 'Sports',
    imageUrl:'put image url here',
    directorName: 'Oliver-Stone',
    directorBio: 'William Oliver Stone is an American filmmaker, director, writer and conspiracy theorist. He won an Academy Award for Best Adapted Screenplay as writer of Midnight Express, and wrote the acclaimed gangster movie Scarface.',
    directorBirthyear: '1946',
    directorDeathyear: ' '
  },
  {
    title: 'Anywhere-But-Here',
    genre: 'comedy',
    description: 'Natalie Portman is smart',
    imageUrl:'put image url here',
    directorName: 'Wayne-Wang',
    directorBio: 'Wayne Wang is a Hong Kong-American director, producer, and screenwriter. Considered a pioneer of Asian-American cinema, he was one of the first Chinese-American filmmakers to gain a major foothold in Hollywood.',
    directorBirthyear: '1949',
    directorDeathyear: ' '
  },
  {
    title: 'Deep-Blue-Sea',
    genre: 'horror',
    description: 'Sharks are scary',
    imageUrl:'put image url here',
    directorName: 'Renny-Harlin',
    directorBio: "Renny Harlin is a Finnish film director, producer and screenwriter. His films include A Nightmare on Elm Street 4: The Dream Master, Die Hard 2, Cliffhanger, The Long Kiss Goodnight, Deep Blue Sea and Devil's Pass",
    directorBirthyear: '1959',
    directorDeathyear: ' '
  },
  {
    title: 'Dogma',
    genre: 'drama',
    description: 'Jay and Silent Bob are here',
    imageUrl:'put image url here',
    directorName: 'Kevin-Smith',
    directorBio: 'Kevin Patrick Smith is an American filmmaker, actor, comedian, public speaker, comic book writer, author, and podcaster. He came to prominence with the low-budget comedy film Clerks, which he wrote, directed, co-produced, and acted in as the character Silent Bob of stoner duo Jay and Silent Bob.',
    directorBirthyear: '1970',
    directorDeathyear: ' '
  },
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
  console.log(Movies[0].directorName);
  let movieDirector = Movies.filter(item => item.directorName === req.params.directorName);

  if(movieDirector){
    res.json(movieDirector);
  } else {
    res.status(400).send('Director is not featured');
  }
});


//   ---USER ENDPOINTS---

//This endpoint adds new users to the API by name
app.post("/update-users/newuser", (req, res) => {
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
app.put("/update-users/:username/:password/:email", (req, res) => {
  let user = Users.find(item => item.username === req.params.username);

  let newUsername = req.body.username;
  let newPassword = req.body.password;
  let newEmail = req.body.email

  if(user){
    user.username = newUsername;
    user.password = newPassword;
    user.email = newEmail;
    res.status(201).send( newUsername + ' has updated their info')
  } else {
    res.status(400).send('User ' + req.params.username + ' was not updated.')
  }
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

  if(!newFavorite.favorites){
    res.status(400).send('Missing favorite movie in request body')
  } else if(newFavorite === Users.favorites){
    res.send('This movie has already been added')
  } else {
    res.status(201).send(req.params.username + ', ' + newFavorite.favorites + ' has been added to your favorites')
  }
});

//This endpoint deletes a favorite from a users profile
app.delete("/update-users/:username/delete-favorites/:userfavorite", (req,res) => {
  let user = Users.find(item => item.username === req.params.username);

  let deleteFavorite = req.params.userfavorite;

  if(deleteFavorite) {
    Users.filter(function(obj){
      return obj.favorites !== deleteFavorite
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
