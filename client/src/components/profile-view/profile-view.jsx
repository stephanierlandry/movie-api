import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import './profile-view.scss';

import { setProfile } from '../../actions/actions'

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
        alert( `${movies.Title } could not be deleted from favorites ` + e)
      });
    }

    deleteUserProfile() {
      axios.delete(`https://design-and-a-movie.herokuapp.com/delete-users/${localStorage.getItem('user')}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
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
          window.open('/client/login', '_self');
        })
        .catch(error => {
          alert('There was an error. Your account could not be deleted. ' + error);
        })
    }

    //Called in the render()
    onLoggedOut(user) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      this.setState({
       user: null
     })
      window.open('/client/login', '_self');
    };

  goBack() {
    history.back();
    window.scroll(0,0);
  }

  render(){

    const { user, userProfile, movies } = this.props;
    console.log(this.props)
    const favoritesList = movies.filter(movie => userProfile.FavoritesMovies.includes(movie._id));


    if( !userProfile){
      return <div className="loading">loading</div>
    }


      return(
        <Container fluid>
          <Row className="hi-container">
            <Col>
              <h1 className="greeting">hi {user}</h1>
            </Col>
          </Row>
          <Row className="profile-view-container">
            <Col lg={8}>
              <div className="user-info-block">
                <h3 className="fav-title">Your Movie Favorites!</h3>
                <div className="user-fav-block">
                  <div className="user-favorites">
                    {userProfile.FavoritesMovies &&
                      <ul>
                        {favoritesList.map(movie =>
                          <li key={movie._id} className="relative">
                            <Link className="img-block" to={`/movie/${movie._id}`}>
                              <img className="movie-image" src={movie.ImagePath} />
                            </Link>
                            <a className="delete-btn" onClick={e => this.deleteFavorites(movie._id)}>X</a>
                          </li>
                        )}
                      </ul>}
                  </div>
                </div>
              </div>
            </Col>

            <Col lg={4}>
              <div className="btn-group">
                <div className="update-btn">
                  <Link to="/update-user/:username" className="btn">Update Your Profile</Link>
                </div>
                <div className="delete-user-btn">
                  <Button type="button" onClick={this.deleteUserProfile.bind(this)}>Delete Account</Button>
                </div>
                <div className="logout-btn">
                  <Button type="button" value="button" onClick={this.onLoggedOut.bind(this)}>Logout</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )
    }
  }

  let mapStateToProps = state => {
    return {
      userProfile: state.userProfile }
  }

  export default connect( mapStateToProps, { setProfile } )(ProfileView);
