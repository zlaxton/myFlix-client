import React from 'react';
import axios from 'axios';// Using it to fetch the movies, then set the state of movies using this.setState
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// #0
import { setMovies } from '../../actions/actions';

// we haven't written this one yet
import MoviesList from '../movies-list/movies-list';


/*#1 The rest of components import statements but without the MovieCard's because it will be imported and used in the MoviesList component rather
  than in here. */
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import NavBar from '../navbar-view/navbar-view'


// SCSS Styling import
import './main-view.scss';

// #2 export keyword removed from here
class MainView extends React.Component {

  constructor() { //The method that React uses to actually create the component
      super(); // This will call the parent React.Component’s constructor, which will give your class the actual React component’s features. Also, it will initialize the component’s this variable
      this.state = {
        // #3 movies state removed from here
          user: null,
        };    
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // Getting all movies in Database
  getMovies(token) {
    axios.get('https://rocky-bayou-72593.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }//By passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API
    })
      .then(response => {
        // #4
        this.props.setMovies(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    // Log In
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  
    render() {
        // #5 movies is extracted from this.props rather than from the this.state
    let { movies } = this.props;
    let { user } = this.state;

      return (
          <Router>
            <NavBar user={user} />
    
            <Row className="main-view justify-content-md-center">
    
              <Route exact path="/" render={() => 
              {
                if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

              <Route path="/register" render={() => 
              {
                if (user) return <Redirect to="/" />
                return <Col>
                  <RegistrationView />
                </Col>
              }} />

              <Route path="/profile" render={() => 
              {
                if (!user) return <Col>
                  <ProfileView />
                </Col>
              }} />

              <Route path="/movies/:movieId" render={({ match, history }) => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => 
                    this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <MovieView movie={movies.find(m => 
                  m._id === match.params.movieId)} onBackClick={() => 
                    history.goBack()} />
                </Col>
              }} />

              <Route path="/directors/:name" render={({ match, history }) => 
              {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => 
                this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => 
              m.Director.Name === match.params.name).Director} onBackClick={() => 
                history.goBack()} />
            </Col>
          }
          } />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => 
                this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => 
              m.Genre.Name === match.params.name).Genre} onBackClick={() => 
                history.goBack()} />
            </Col>
            }} />

            <Route exact path='/users/:username' render={({ history }) => {
              if (!user) return <LoginView onLoggedIn={(data) => 
                this.onLoggedIn(data)} />;
              if (movies.length === 0) return;
              return <ProfileView history={history} movies={movies} />
            }} />
  
          </Row>
        </Router>
      );
    }
  };


 // #7
let mapStateToProps = state => {
  return { movies: state.movies }
}

// #8
export default connect(mapStateToProps, { setMovies })(MainView);// Modules