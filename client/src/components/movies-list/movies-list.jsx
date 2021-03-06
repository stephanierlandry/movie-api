/**
*@description This component displays the list of movies 
*@requires React
*@requires React-Redux
*@requires React-Bootstrap
*@access private
*/

import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

import Col from 'react-bootstrap/Col';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

/**
* returns the movies based on the search input
*@function MoviesList
*@param {string} movie
*@returns {array} movies
*/
function MoviesList(props) {
  const { movie, visibilityFilter} = props;

  let filteredMovies = movie;

  if (visibilityFilter !== '') {
    filteredMovies = movie.filter(m =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!filteredMovies) {
    return <div className="loading">loading</div>;}

  return (
    <React.Fragment>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        {filteredMovies.map(m => <Col md={4}><MovieCard key={m._id} movie={m}/></Col>)}
    </React.Fragment>
  )
}

export default connect(mapStateToProps)(MoviesList);
