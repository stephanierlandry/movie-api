import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

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
      movies: null,
      selectedMovie: null,
      user: null
    };
  }

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://design-and-a-movie.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData)
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
  axios.get('YOUR_API_URL/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
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
    const { movies, selectedMovie, user } = this.state;

    // If no user has been logged in this view will be loaded
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // if (!user) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />;


    return(
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
          </Navbar>
        </Container>

        <div className="main-view">
          {selectedMovie ?
            <Container>
              <Row>
                <MovieView movie={selectedMovie}/>
              </Row>
            </Container>
            :
            <Container>
              <Row>
              { movies ?
                movies.map(movie => (
                  <Col md={4}>
                    <MovieCard key={`${movie._id}-${Math.random()}`} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
                  </Col>
                ))
                :
                <div className="loading">loading...</div>
              }
              </Row>
            </Container>
          }
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
          </Navbar>
        </Container>
      </div>
    )
  }
}
