import React from 'react';
import axios from 'axios';

import './profile-view.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export class ProfileView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  deleteFavorites(movieId) {
      axios.delete(`https://design-and-a-movie.herokuapp.com/update-users/${localStorage.getItem('user')}/favorites/${movieId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(res => {
          document.location.reload(true);
        })
        .then(res => {
          alert('Movie successfully deleted from favorites');
        })

        .catch(e => {
          alert('Movie could not be deleted from favorites ' + e)
        });
    }

  goBack() {
    history.back();
  }

  render(){

    const { user, userProfile, movies } = this.props;
    const favoritesList = movies.filter(movie => userProfile.FavoritesMovies.includes(movie._id));

    if(!user || !userProfile){
      return <div className="loading">loading</div>
    }

    if(user || userProfile) {
      return(
        <Container>
          <Row>
            <Col>
              <div className="user-info-block">
                <div className="user-name">
                  <span className="value">{userProfile.Username}</span>
                </div>
                <div className="user-favorites">
                  {!userProfile.FavoritesMovies && <div>no movies</div>}
                  {userProfile.FavoritesMovies &&
                    <ul>
                      {favoritesList.map(movie =>
                        <li key={movie._id}>
                          <Link to={`/movie/${movie._id}`}>{movie.Title}</Link>
                          <Button type="button" onClick={this.deleteFavorites.bind(this)}>X</Button>
                        </li>
                      )}
                    </ul>}
                </div>
              </div>
            </Col>
            <Col>
              <div className="updateButton">
                <Link to="/update-user/:username" className="btn">Update Your Profile</Link>
              </div>
              <Link to={`/`}>
                <Button variant="link" className="btn back-button">Back</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}
