import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Link } from "react-router-dom";

import PropTypes from 'prop-types';

import './profile-update-view.scss';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function ProfileUpdateView(props){

  console.log(props)

  const [username, updateUsername] = useState('');
  const [password, updatePassword] = useState('');
  const [email, updateEmail] = useState('');
  const [birthday, updateBirthday] = useState('');


  const handleUpdate = (e) => {
    //prevents the default behavior of submitting the form so authentication can happen
    e.preventDefault();
    //Sends an update to the database
    axios.put(`https://design-and-a-movie.herokuapp.com/update-users/${localStorage.getItem('user')}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    }, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      const data = response.data;
      alert('Your profile has been updated!');
      localStorage.setItem('user', data.Username);
      window.open('/user/:username', '_self');
    })
    .catch(error => {
      alert('Error updating profile');
    })
  }

  const goBack = () => {
    history.back();
  }

  return (

    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" className="form" placeholder="Username" value={username} onChange={e => updateUsername(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" className="form" value={password} onChange={e=> updatePassword(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" className="form" value={email} onChange={e=> updateEmail(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="date" className="form" value={birthday} onChange={e=> updateBirthday(e.target.value)}></Form.Control>
      </Form.Group>
      <div className="button-group">
        <Button variant="primary" type="submit" onClick={handleUpdate}>Update</Button>
        <Button variant="link" className="btn" onClick={goBack}>Back</Button>
      </div>
    </Form>

  )
}

ProfileUpdateView.proptypes{
  user
}
