import React from 'react';

import './movie-view.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack() {
    history.back();
  }

  render() {
    const { movie, userData } = this.props;
    console.log(this.props)

    if(!movie){
      return null
    }

    if (movie && userData) {

      return (
        <Container>
          <Row>
            <Col>
              <div className="movie-view">
                <img className="movie-poster" src={movie.ImagePath} />
              </div>
            </Col>
            <Col>
              <div className="movie-block">
                  <div className="movie-title">
                    <span className="value">{movie.Title}</span>
                  </div>
                  <div className="movie-description">
                    <span className="value">{movie.Description}</span>
                  </div>

                  <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                      <span className="value link">{movie.Genre.Name}</span>
                    </Link>
                  </div>
                  <div className="movie-director">
                    <span className="label">Director: </span>
                    <Link to={`/directors/${movie.Director.Name}`}>
                      <span className="value link">{movie.Director.Name}</span>
                    </Link>
                  </div>
                <Link to={`/`}>
                  <Button variant="link" className="btn back-button">Back</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}
