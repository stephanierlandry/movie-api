/**
*@description This component is where a new user registers to use the app
*@requires React
*@requires axios
*@requires React-Bootstrap
*@access public
*/

import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import './registration-view.scss'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  /**
  * Registers a new user and send their info to the API
  *@function handleRegister
  *@param {string} username
  *@param {string} password
  *@param {string} email
  *@param {string} birthday
  */
  const handleRegister = (e) => {
  e.preventDefault();

  axios.post('https://design-and-a-movie.herokuapp.com/update-users/newuser', {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday
  })
  .then(response => {
    const data = response.data;
    alert('You have successfully registered. Please login now!')
    window.open('/client/login', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
  })
  .catch(e => {
    alert('There is an error. Please try again.')
    console.log(e,'error registering the user')
  });
};

  return (

    <div className="login-body">
        <Row>
          <Col></Col>
          <Col xs="auto">
            <Form>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" className="form" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" className="form" value={password} onChange={e=> setPassword(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" className="form" value={email} onChange={e=> setEmail(e.target.value)}></Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="date" className="form" value={birthday} onChange={e=> setBirthday(e.target.value)}></Form.Control>
              </Form.Group>

              <div className="button-group">
                <Button variant="primary" type="submit" onClick={handleRegister}>Register</Button>
                <Link to="/login" className="btn">Already a User? Login Here</Link>
              </div>
            </Form>
          </Col>
          <Col></Col>
        </Row>
    </div>
  );
}
