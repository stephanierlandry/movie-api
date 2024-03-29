/**
*@description This component is the home page of the app.
*@requires React
*@requires Prop-Types
*@requires React-Router-Dom
*@requires React-Bootstrap
*@requires FeatherIcon
*@access private
*/

import React from 'react';
import axios from 'axios';

import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import {setMovies, setFilter, setProfile} from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdateView } from '../profile-view/profile-update-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

import FeatherIcon from 'feather-icons-react';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      userProfile:null
    };
  }

  componentDidMount() {

    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUserProfile(accessToken);
    }
  }

  //Called in componentDidMount
  /**
  * Gets the movies from the API
  *@function getMovies
  *@param {string} token
  *@returns {array} movies
  */
  getMovies(token) {
    axios.get('https://design-and-a-movie.herokuapp.com/movies', {
      //this passes the bearer authorization into your header with http requests, making authentication requests to your API possible.
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  /**
  * Gets the user's profile from the API
  *@function getUserProfile
  *@param {string} token
  *@returns {object} userProfile
  */
  getUserProfile(token){
    axios.get(`https://design-and-a-movie.herokuapp.com/get-users/${localStorage.getItem('user')}`,{
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        userProfile: response.data
      });
    })
    .catch(function(error){
      console.log(error);
    })
  }

  /**
  * Stores user's name and token in localStorage
  *@function onLoggedIn
  *@returns {string} token
  *@returns {string} user
  */
  onLoggedIn(authData) {
    //authData refers to the username and the token
    this.setState({
      user: authData.user.Username
    });

    //Actually stores the token and username. setItem takes in a key/value pair
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getUserProfile(authData.token);
  }

  //Called in the render()
  /**
  * Removes user's name and token in localStorage
  *@function onLoggedOut
  *@returns {string} token
  *@returns {string} user
  */
  onLoggedOut(user) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.setState({
     user: null
   })
    window.open('/client/login', '_self');
  };

  //called in the render()

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  render() {

    let { movies } = this.props;
    let { user, userProfile } = this.state;

    if (!movies) {
      return <div className="loading">loading</div>;}

    return(
      <Router basename="/client">
          <Container fluid>
            <Row>
              <Navbar fixed="top" expand="lg" className="nav-container">
                <Navbar.Brand href="/client/movies" className="logo-container">
                  <img src="https://design-and-a-movie-images.s3.us-east-2.amazonaws.com/DM.png" alt="Design and a Movie Logo" width="120" height="120" className="design-movie-logo"/>
                </Navbar.Brand>
                <div className="user-name">
                  <Link to={`/user/${user}`} className="username">{ user }</Link>
                </div>
              </Navbar>
            </Row>

            <Row className="main-container">
              <Route exact path="/client"
                      render={() => {
                        if (!user) {
                          window.location="https://design-and-a-movie.herokuapp.com/client/login"
                        } else {
                          window.location="/client/movies"
                        }
                      }}/>

              <Route path="/login"
                      render={() => {
                        return (
                          <LoginView onLoggedIn={user => this.onLoggedIn(user)}
                                     userData={this.state.user} />
                        )
                      }}/>

              <Route path="/register"
                      render={() => {
                        return (
                          <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />
                        );
                      }}/>

              <Route exact path="/movies"
                     render={() => {
                       return (
                          <MoviesList key={movies._id} movie={movies}/>
                       );
                     }}/>

              <Route exact path="/movie/:movieId"
                     render={({match}) => {
                       return (
                         <MovieView movie={movies.find(m =>m._id === match.params.movieId)}
                                    userData={this.state.user}/>
                       );
                     }}/>

              <Route exact path="/directors/:name"
                      render={({match}) => {
                        // if (!movies) return <div className="main-view"/>;)
                        return (
                          <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>
                        );
                      }}/>

              <Route exact path="/genres/:name"
                      render={({match}) => {
                        if (!movies) return <div className="main-view"/>;
                        return (
                          <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>
                        );
                      }}/>

              <Route exact path="/user/:username"
                      render={() => {
                        return (
                          <ProfileView user={user}  movies={movies} userProfile={userProfile} />
                        );
                      }}/>

              <Route exact path="/update-user/:username"
                      render={() => {
                        return (
                          <ProfileUpdateView user={user} userProfile={userProfile} movies={movies}/>
                        )
                      }}/>
            </Row>

            <Row>
              <Navbar expand="md" fixed="bottom" className="footer-container">
                <Nav.Link href="https://www.facebook.com/designandamovie/" className="footer-link">
                  <FeatherIcon icon="facebook" />
                </Nav.Link>
                <Nav.Link href="https://www.instagram.com/designandamovie/" className="footer-link">
                  <FeatherIcon icon="instagram" />
                </Nav.Link>
                <Nav.Link href="https://granthurlbert.bigcartel.com/" className="footer-link">
                  <FeatherIcon icon="shopping-bag" />
                </Nav.Link>
                <div className="logout-btn">
                  <Button type="button" value="button" onClick={this.onLoggedOut.bind(this)}>Logout</Button>
                </div>
              </Navbar>
            </Row>
          </Container>

      </Router>
    )
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    userProfile: state.userProfile
     }
}

export default connect(mapStateToProps, {setMovies, setProfile} )( MainView);

//key refers to what the may be updated in the DOM

MainView.propTypes = {
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
