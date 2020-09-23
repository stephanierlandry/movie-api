/**
*@description This component contains the view of the genre's information.
*@requires React
*@access private
*/

import React from 'react';

import './genre-view.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export class GenreView extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  /**
  * goes back to previous page
  *@function goBack
  */
  goBack() {
    history.back();
  }

  render(){
    console.log(this.props)
    const {genre} = this.props;

    if(!genre) return null;

    return(
      <Container>
        <Row>
          <Col></Col>
          <Col sm={6}>
            <div className="genre-block">
              <div className="genre-name">
                <h1>{genre.Name}</h1>
              </div>
              <div className="genre-info">
                <p>{genre.Description}</p>
              </div>
              <button onClick={genre =>this.goBack()} className="back-button btn">Back</button>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
  }
}
