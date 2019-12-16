import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';

export class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://design-and-a-movie.herokuapp.com/movies')
      .then(response => {
        console.log('response');
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies } = this.state;

    // Before the movies have been loaded

    if (movies.length < 1 || !movies) {
      return (
        <div>loading</div>
      )
    }

    return (
     <div className="main-view">
     { movies.map(movie => (
       <MovieCard key={movie._id} movie={movie}/>
     ))}
     </div>
    );
  }
}
