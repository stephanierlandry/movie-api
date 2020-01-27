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
    const { movie } = this.props;

    if (!movie) return null;

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
                  <span className="value">{movie.Genre.Name}</span>
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link" className="btn">Genre</Button>
                  </Link>
                </div>
                <div className="movie-director">
                  <span className="label">Director: </span>
                  <span className="value">{movie.Director.Name}</span>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link" className="btn">Director</Button>
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
