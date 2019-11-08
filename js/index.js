const express = require('express');
const morgan = require('morgan');
const app = express();

let topMovies = [
  {title: 'V for Vendetta'},
  {title: 'Girl Interupted'},
  {title: 'The Mummy'},
  {title: 'Fight Club'},
  {title: 'The Matrix'}
]

app.use(morgan('common'));

app.get('/movies', function(req,res){
  res.json(topMovies)
});
app.get('/', function(req,res){
  res.send('Hello there')
})

app.use(express.static('public'));

app.use(function(err,req,res,next){
  console.log(err.stack);
  res.status(500).send('Something Broke')
});

app.listen(8080,() =>
  console.log('Hey')
);
