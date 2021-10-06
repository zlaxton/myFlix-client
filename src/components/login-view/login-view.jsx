import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './login-view.scss';
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

export function LoginView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://rocky-bayou-72593.herokuapp.com/login', {
      Username: Username,
      Password: Password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log(e)
    });
  };



  return (
    <Row className="login-wrapper justify-content-md-center">
      <Col xs={12} md={8} lg={6}> 
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" value={Username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="Password" placeholder="Password" value={Password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Link to={`/register`}>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
        </Button>
        </Link>
    </Form>
    </Col>
    </Row>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (username, password) => dispatch(handleSubmit(username, password))
});

export default connect(null, mapDispatchToProps)(LoginView);

/*LoginView.propTypes = {
    user: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
  };*/