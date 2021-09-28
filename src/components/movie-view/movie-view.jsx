import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

export class MovieView extends React.Component {

  

  componentDidMount() {
    document.addEventListener('keypress', event => {
      console.log(event.key);
    });
  }

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImageURL} />
        </div>
        <div className="movie-title">
          <h1>
            <Badge bg="primary">
              <span className="value">{movie.Title}</span>
            </Badge></h1>
        </div>
        <div className="movie-description">
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre: </Button>
          </Link>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-director">
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director: </Button>
          </Link>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <Button variant='danger' className="fav-button" value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>
          Add to Favorites
        </Button>
        <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    );
  }
}
MovieView.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    ImageURL: propTypes.string.isRequired,
    Featured: propTypes.bool,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired
    }),
    Director: propTypes.shape({
      Name: propTypes.string.isRequired
    }),
  }).isRequired
};