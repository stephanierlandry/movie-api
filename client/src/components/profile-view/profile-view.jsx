import React from 'react';

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
