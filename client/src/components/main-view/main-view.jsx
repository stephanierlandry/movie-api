import React from 'react';
import axios from 'axios';

import { BrowserRouter, Route, Link} from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

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

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      userInfo: {}
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    //If there is a token sign the user in and getMovies
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUserInfo(accessToken);
    }
  }

  //called in the render()
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  //Called in the render()
  onLoggedIn(authData) {
    //authData refers to the username and the token
    this.setState({
      user: authData.user.Username
    });

    //Actually stores the token and username. setItem takes in a key/value pair
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  //Called in the render()
  onLoggedOut(user) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.setState({
     user: null
   })
    window.open('/', '_self');
  };


  //Called in componentDidMount
  getMovies(token) {
    axios.get('https://design-and-a-movie.herokuapp.com/movies', {
      //this passes the bearer authorization into your header with http requests, making authentication requests to your API possible.
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      // console.log({from: 'mainview', m: 'response'})
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getUserInfo(token){
    axios.get(`http://localhost:3000/get-users/${localStorage.getItem('user')}`,{
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response)
      this.props.setUserInfo(response.data)
    })
    .catch(function(error){
      console.log(error);
    })
  }

  render() {
    const { movies, selectedMovie, user, userInfo } = this.state;

    if (!movies) return <div className="main-view loading">loading</div>;

    return(
      <BrowserRouter>
        <div>
          <Container>
            <Navbar expand="md" fixed="top">
              <Navbar.Brand href="../main-view/main-view">
                <img src="https://scontent-atl3-1.cdninstagram.com/v/t51.2885-19/s320x320/22157915_286342841858633_7255692800950272000_n.jpg?_nc_ht=scontent-atl3-1.cdninstagram.com&amp;_nc_ohc=kIG5qCpFmHYAX97KJQU&amp;oh=9381e9e2f373a66031f4f936fd9f51ff&amp;oe=5EA94421" alt="Design and a Movie Logo" width="120" height="120" className="design-movie-logo"/>
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="basic-navbar-nav" />

              <Navbar.Collapse id="basic-navbar-nav">
                <Form inline className="search-form">
                  <FormControl type="text" placeholder="Search" className="mr-sm-2 search" />
                  <Button className="btn">Search</Button>
                </Form>
              </Navbar.Collapse>
              <Link to={`/user/${user}`} className="userProfile">
                <div>{user}</div>
              </Link>
            </Navbar>
          </Container>

          <div className="main-view">
            <Container>
              <Row>
                <Route exact path="/"
                        render={() => {
                          if (!user) {
                            window.location="http://localhost:1234/login"
                          } else {
                            window.location="/movies"
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
                       render={() => movies.map((m) => {

                         return (
                           <Col md={4}> <MovieCard key={m._id} movie={m}/> </Col>
                         );
                       })}/>

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
                            <ProfileView user={user}/>
                          );
                        }}/>

              </Row>
            </Container>
          </div>

          <Container>
            <Navbar expand="md" fixed="bottom">
              <Nav.Link href="https://www.facebook.com/designandamovie/" className="footer-link">
                <FeatherIcon icon="facebook" />
              </Nav.Link>
              <Nav.Link href="https://www.instagram.com/designandamovie/" className="footer-link">
                <FeatherIcon icon="instagram" />
              </Nav.Link>
              <Nav.Link href="https://granthurlbert.bigcartel.com/" className="footer-link">
                <FeatherIcon icon="shopping-bag" />
              </Nav.Link>
              <button className="btn btn-primary" type="button" value="button" onClick={this.onLoggedOut.bind(this)}>logout</button>
            </Navbar>
          </Container>
        </div>
      </BrowserRouter>
    )
  }
}

//key refers to what the may be updated in the DOM
