/**
*@description This component shows the individual movie's details.
*@requires React
*@requires axios
*@requires Prop-Types
*@requires React-Bootstrap
*@requires React-Router-Dom
*@access private
*/

import React from 'react';
import axios from 'axios';

import './movie-view.scss';

import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    window.scrollTo(0,0);
  }

  /**
  * goes back to previous page
  *@function goBack
  */
  goBack() {
    history.back();
    window.scroll(0,0);
  }

  /**
  * Adds a user favorite to their profile
  *@function addUserFavorites
  *@param {string} user
  *@param {string} movieId
  */
  addUserFavorites(e){
    const {movie} = this.props;
    e.preventDefault();
    axios.post(`https://design-and-a-movie.herokuapp.com/update-users/${localStorage.getItem('user')}/movies/${movie._id}`,
    {username: localStorage.getItem('user')
    },
    {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      document.location.reload(true);
    })
    .then(resposne => {
      alert(`${movie.Title} was added to your Favorites List`)
    })
    .catch(error => {
      alert(error + ` ${movie.Title} cannot be added to your Favorites List`)
    })
  }

  render() {
    const { movie, userData} = this.props;
    console.log(this.props)

    if(!movie){
      return <div className="loading">loading</div>
    }

    if (movie && userData) {

      return (

          <Row className="movie-view-container">
            <Col lg ={4}>
              <div className="movie-view">
                <img className="movie-poster" src={movie.ImagePath} />
              </div>
              <div>
                <a className="btn fav-btn" onClick={this.addUserFavorites.bind(this)}>Add Movie to Favorites!</a>
              </div>
            </Col>
            <Col lg ={4}>
              <div className="movie-block">
                  <div className="movie-title">
                    <span className="value">{movie.Title}</span>
                  </div>
                  <div className="movie-description">
                    <span className="value">{movie.Description}</span>
                  </div>

                  <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                      <span className="value link">{movie.Genre.Name}</span>
                    </Link>
                  </div>

                  <div className="movie-director">
                    <span className="label">Director: </span>
                    <Link to={`/directors/${movie.Director.Name}`}>
                      <span className="value link">{movie.Director.Name}</span>
                    </Link>
                  </div>
                  <Button variant="link" className="btn back-button" onClick={this.goBack.bind(this)}>Back</Button>
              </div>
            </Col>
          </Row>

      );
    }
  }
}

MovieView.propTypes = {
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
