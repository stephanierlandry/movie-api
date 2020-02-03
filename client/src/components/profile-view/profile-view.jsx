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
    this.state = {};
  }

  render(){

    const { movie, user } = this.props;
    console.log(this.props);

    if(!user){
      return null
    }

    if(user) {
      return(
        <div className="profileBlock">hi</div>
      )
    }
  }
}
