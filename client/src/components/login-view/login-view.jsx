import React, { useState } from 'react';
import axios from 'axios';
import {RegistrationView} from '../registration-view/registration-view';

import './login-view.scss';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('http://localhost:3000/login', {
      Username: username,
      Password: password
    })
    // axios.get('https://design-and-a-movie.herokuapp.com/get-users/' + username)
    .then(response => {
      // console.log(response)
      // const data = response.data;
      // props.onLoggedIn(data);
    })
    .catch(e => {
      // console.log('no such user')
    });
  };




  return (
    <div className="login-body">
      <Container>
        <Navbar expand="md" fixed="top">
          <Navbar.Brand>
            <img src="https://scontent-atl3-1.cdninstagram.com/v/t51.2885-19/s320x320/22157915_286342841858633_7255692800950272000_n.jpg?_nc_ht=scontent-atl3-1.cdninstagram.com&amp;_nc_ohc=kIG5qCpFmHYAX97KJQU&amp;oh=9381e9e2f373a66031f4f936fd9f51ff&amp;oe=5EA94421" alt="Design and a Movie Logo" width="120" height="120" className="design-movie-logo"/>
          </Navbar.Brand>
        </Navbar>
      </Container>

      <Container>
        <div className="login-space"></div>
        <Row>
          <Col></Col>
          <Col>
            <Form>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" className="form" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" className="form" value={password} onChange={e=> setPassword(e.target.value)}></Form.Control>
              </Form.Group>

              <div className="button-group">
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                <a href="../registration-view/registration-view" type="button" value="button" onClick={movie=>this.goBack()} className="btn">New User? Register Here</a>
              </div>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>

  );
}
