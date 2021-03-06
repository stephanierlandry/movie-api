/**
*@description This component is the login page.
*@requires React
*@requires Axios
*@requires React-Router-Dom
*@requires React-Bootstrap
*@access public
*/

import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Link } from "react-router-dom";

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


  /**
  * Submits username and password to API and logs user in if user's information is correct
  *@function handleSubmit
  *@param username
  *@param password
  *@returns {string} userData
  */
  const handleSubmit = (e) => {
    //prevents the default behavior of submitting the form so authentication can happen
    e.preventDefault();
    //Send a request to the server for authentication
    axios.post('https://design-and-a-movie.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    //response comes in from the database
    .then(response => {
      // console.log({from: 'loginview', m: response});
      const data = response.data;
      //If there is a match onLoggedIn is called.
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  if (props.userData) {
    window.location="/client/movies"
  }


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

                <div className="button-group">
                  <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                  <Link to="/register" className="btn">Register Here</Link>
                </div>
              </Form>
            </Col>
            <Col></Col>
          </Row>
      </div>
  );
}
