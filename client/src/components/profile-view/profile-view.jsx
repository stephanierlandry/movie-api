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
          alert(`${movies.Title} successfully deleted from favorites`);
        })
        .catch(e => {
          alert( `${movie.Title } could not be deleted from favorites ` + e)
        });
    }

    deleteUserProfile() {
      axios.delete(`https://design-and-a-movie.herokuapp.com/delete-users/${localStorage.getItem('user')}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(response => {
          alert('Do you really want to delete your account?')
        })
        .then(response => {
          alert('Account was successfully deleted!')
        })
        .then(response => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          this.setState({
           user: null
         })
          window.open('/', '_self');
        })
        .catch(error => {
          alert('There was an error. Your account could not be deleted. ' + error);
        })
    }

  goBack() {
    history.back();
  }

  render(){

    const { user, userProfile, movies } = this.props;
    const favoritesList = movies.filter(movie => userProfile.FavoritesMovies.includes(movie._id));

    console.log(userProfile)

    if(!user || !userProfile){
      return <div className="loading">loading</div>
    }

    if(user || userProfile) {
      return(
        <Container>
          <Row>
            <Col>
              <div className="user-info-block">
                <h1>hi {user}</h1>
                <div className="update-btn">
                  <Link to="/update-user/:username" className="btn">Update Your Profile</Link>
                </div>
                <div className="delete-user-btn">
                  <Button type="button" onClick={this.deleteUserProfile.bind(this)}>Delete Account</Button>
                </div>
              </div>
            </Col>

            <Col>
              <h3 className="fav-title">Your Movie Favorites!</h3>
              <div className="user-fav-block">
                <div className="user-favorites">
                  {!userProfile.FavoritesMovies && <div>no movies</div>}
                  {userProfile.FavoritesMovies &&
                    <ul>
                      {favoritesList.map(movie =>
                        <li key={movie._id}>
                          <Link to={`/movie/${movie._id}`}>
                            <img className="movie-image" src={movie.ImagePath} />
                          </Link>
                          <Button type="button" onClick={e => this.deleteFavorites(movie._id)}>X</Button>
                        </li>
                      )}
                    </ul>}
                </div>

                <Link to={`/`}>
                  <Button variant="link" className="btn back-button">Back</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}
