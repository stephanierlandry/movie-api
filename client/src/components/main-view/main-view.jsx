import React from 'react';
import axios from 'axios';


import { LoginView } from '../login-view/login-view';
import {RegistrationView} from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    // If no user has been logged in this view will be loaded
    // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // if (!user) return <RegistrationView onLoggedIn={user => this.onLoggedIn(user)} />;


    return(
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
              <React.Fragment>loading...</React.Fragment>
            }
            </Row>
          </Container>
        }
      </div>
    )
  }
}
