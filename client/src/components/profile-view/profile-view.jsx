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

  render(){

    const { user, userProfile } = this.props;
    console.log({m:'profileView', r:userProfile});

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
