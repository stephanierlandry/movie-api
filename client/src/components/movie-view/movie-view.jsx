import React from 'react';

import './movie-view.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
                </div>
                <div className="movie-director">
                  <span className="label">Director: </span>
                  <span className="value">{movie.Director.Name}</span>
                </div>
              <a href="../movie-view/movie-view" onClick={movie =>this.goBack()} className="back-button btn">Back</a>
            </div>
            </Col>
        </Row>
      </Container>
    );
  }
}
