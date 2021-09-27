import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from "../registration-view/registration-view";
import { Container } from "react-bootstrap";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {
  constructor() {
    super();
    //initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null,
    };
  }
  getMovies(token) {
    axios.get('https://rocky-bayou-72593.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegistration(register) {
    this.setState({
      register,
    });
  }
   
  render() {
    const { movies, selectedMovie, user } = this.state;

    

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (!register)
      return (
        <RegistrationView
          onRegistration={(register) => this.onRegistration(register)}
        />
      );
  
    if (movies.length === 0) return <div className="main-view" />;
  
    return (
      <Container>
  <div className="main-view justify-content-md-center">
    {selectedMovie
      ? (
        <Row className="justify-content-lg-center">
        <Col lg={9} md={8}>
          <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
        </Col>
        </Row>
      )
      : (
        <Row className="justify-content-center">
        {movies.map(movie => (
        <Col xs={10} md={4} lg={3} sm={7} > 
          <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        </Col>
      ))}
      </Row>
      )
    }
  </div>
);
        
  
</Container>
    );
}
}