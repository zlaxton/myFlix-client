import React from 'react';
import { Container } from 'react-bootstrap';
//import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

  addFavorite() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`rocky-bayou-72593.herokuapp.com/users/${username}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert(`Added to Favorites List`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movie } = this.props;

    return (
      <Container>
      <Card>
        <Link to={`/movies/${movie._id}`}>
          <Card.Img className="image-container" variant="top" src={movie.ImagePath} />
        </Link>
        <Card.Body>
          <Card.Title><h4>{movie.Title}</h4></Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="primary">Open</Button>
          </Link>
        </Card.Body>
      </Card>
  

      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};