import React from 'react';
import axios from 'axios';

import './director-view.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  goBack() {
    history.back();
  }



  render(){
    console.log(this.props)
    const {director} = this.props;

    if(!director) return null;

    return(
      <Container>
        <Row>
          <Col></Col>
          <Col sm={6}>
            <div className="director-block">
              <div className="director-name">
                <h1>{director.Name}</h1>
              </div>
              <div className="director-info">
                <p>{director.Bio}</p>
                <p>{director.Birth} {director.Death}</p>
              </div>
              <button onClick={director =>this.goBack()} className="back-button btn">Back</button>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }
}
