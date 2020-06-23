import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    if(!movie){
      return <div className="loading">loading</div>
    }

    if(movie){
      return (
        <Link to={`/movie/${movie._id}`}>
          <Card variant="link" key={movie._id}>
            <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Title>{movie.Title}</Card.Title>
          </Card>
        </Link>
      );
    }
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }),
    ImagePath: PropTypes.string,
    Featured: PropTypes.bool,
    Actors: PropTypes.array
  })
};
