import React, { useState } from 'react';
import {RegistrationView} from '../registration-view/registration-view';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };


  return (
    <Form>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e=> setPassword(e.target.value)}></Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      <Button href="../registration-view/registration-view" type="button" value="button" onClick={movie=>this.goBack()} className="new-registration-button">New User? Register Here</Button>
    </Form>

    // <form>
    //   <label>
    //     Username:
    //     <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
    //   </label>
    //   <label>
    //     Password:
    //     <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    //   </label>
    //   <button type="button" onClick={handleSubmit}>Submit</button>
    //   <a href="../registration-view/registration-view" onClick={movie =>this.goBack()} className="new-registration-button" type="button"> New User? Register Here!</a>
    // </form>
  );
}
