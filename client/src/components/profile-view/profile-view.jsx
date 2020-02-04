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
      userProfile: {}
    };
  }

  goBack() {
    history.back();
  }

  render(){

    const { user, userProfile } = this.props;
    console.log({m:'profileView', r:userProfile});

    if(!user){
      return null
    }

    if(user) {
      return(
        <Container>
          <Row>
            <Col>
              <div className="user-info-block">
                <div className="user-name">
                  <span className="value">{userProfile.Username}</span>
                </div>
                <div className="user-favorites">
                  <span className="value">{userProfile.FavoriteMovies}</span>
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
